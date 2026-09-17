import { getSupabaseClient, getTenantId } from "@/lib/supabase"
import { products as fallbackProducts, type Product } from "@/lib/data/products"

type Row = { slug:string|null; name_i18n:Record<string,string>|null; description_i18n:Record<string,string>|null; category:string|null; features:unknown; applications:unknown; image_url:string|null; extra_data:Record<string,unknown>|null }
const text=(v:Record<string,string>|null,fallback:string)=>v?.en||v?.zh||fallback
export async function fetchProductsData():Promise<Product[]> {
  const db=getSupabaseClient(), tenant=getTenantId(); if(!db||!tenant)return fallbackProducts
  const {data,error}=await db.from('products').select('slug,name_i18n,description_i18n,category,features,applications,image_url,extra_data').eq('tenant_id',tenant).eq('is_active',true).order('sort_order')
  if(error||!data?.length)return fallbackProducts
  return (data as Row[]).map((r,index)=>{
    const fallback=fallbackProducts.find((product)=>product.slug===r.slug) || fallbackProducts[index] || fallbackProducts[0]
    return {slug:r.slug||fallback.slug,category:{en:r.category||'Fly Ash'},grades:Array.isArray(r.extra_data?.grades)?(r.extra_data.grades as string[]).map(en=>({en})):fallback.grades,name:{en:text(r.name_i18n,fallback.name.en)},summary:{en:text(r.description_i18n,fallback.summary.en)},description:{en:text(r.description_i18n,fallback.description.en)},applicationSlugs:Array.isArray(r.extra_data?.application_slugs)?r.extra_data.application_slugs as string[]:fallback.applicationSlugs,image:{src:r.image_url||fallback.image.src,alt:fallback.image.alt}}
  })
}
export async function fetchProductBySlug(slug:string){return (await fetchProductsData()).find(p=>p.slug===slug)||null}
