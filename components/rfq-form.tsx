"use client"

import { useId, useState } from "react"
import { AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { products } from "@/lib/data/products"
import { resolveLocaleText } from "@/lib/i18n"
import { InquiryCaptchaField } from "@/components/inquiry-captcha-field"

type SubmitState = "idle" | "submitting" | "success" | "error"

/**
 * Integration boundary: this form intentionally does not persist inquiries.
 * Submission is wired to call POST /api/rfq (not yet implemented), which is
 * expected to validate an image CAPTCHA response and write the inquiry to a
 * Supabase table. Until that backend exists, submitting always resolves to
 * the "pending-integration" state below — never a fabricated success.
 */
export function RfqForm() {
  const formId = useId()
  const [state, setState] = useState<SubmitState>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState("submitting")
    setErrorMessage(null)

    const formData = new FormData(event.currentTarget)

    try {
      formData.set("message", `${String(formData.get("requirements") || "")}\n\n${String(formData.get("message") || "")}`)
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        setErrorMessage(payload?.error ?? "The inquiry could not be submitted. Please try again.")
        setState("error")
        setRefreshKey((value) => value + 1)
        return
      }
      event.currentTarget.reset()
      setState("success")
      setRefreshKey((value) => value + 1)
    } catch {
      setErrorMessage("The inquiry could not be submitted. Please try again.")
      setState("error")
      setRefreshKey((value) => value + 1)
    }
  }

  if (state === "success") {
    return (
      <div
        role="status"
        className="rounded-md border border-primary/30 bg-primary/5 p-6 text-sm leading-relaxed text-foreground"
      >
        <p className="font-semibold text-green-700">Your inquiry has been submitted successfully.</p>
        <p className="mt-2 text-muted-foreground">
          Thank you. Our team will review your requirements and respond directly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-describedby={`${formId}-notice`}>
      <p id={`${formId}-notice`} className="text-sm text-muted-foreground">
        Fields marked with an asterisk (*) are required.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${formId}-name`}>Full name *</Label>
          <Input id={`${formId}-name`} name="name" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${formId}-company`}>Company *</Label>
          <Input id={`${formId}-company`} name="company" required autoComplete="organization" />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${formId}-email`}>Email *</Label>
          <Input id={`${formId}-email`} name="email" type="email" required autoComplete="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${formId}-phone`}>Phone / WhatsApp *</Label>
          <Input id={`${formId}-phone`} name="phone" type="tel" required autoComplete="tel" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${formId}-product`}>Target product *</Label>
        <select
          id={`${formId}-product`}
          name="product"
          required
          defaultValue=""
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="" disabled>
            Select a product
          </option>
          {products.map((product) => (
            <option key={product.slug} value={product.slug}>
              {resolveLocaleText(product.name)}
            </option>
          ))}
          <option value="other">Other / not sure</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${formId}-requirements`}>Purchasing requirements *</Label>
        <Textarea
          id={`${formId}-requirements`}
          name="requirements"
          required
          rows={3}
          placeholder="Quantity, packaging, destination port, target timing, etc."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${formId}-message`}>Message *</Label>
        <Textarea id={`${formId}-message`} name="message" required rows={4} />
      </div>

      {state === "error" && (
        <div role="alert" className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      <InquiryCaptchaField refreshKey={refreshKey} />

      <Button type="submit" size="lg" disabled={state === "submitting"} className="control-affordance w-full sm:w-auto">
        {state === "submitting" && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
        {state === "submitting" ? "Submitting…" : "Submit Inquiry"}
      </Button>
    </form>
  )
}
