import { getSupabaseClient, getTenantId } from "@/lib/supabase"
export type Article={slug:string;title:string;excerpt:string;content:string;publishedAt:string;featuredImage:string|null}
const pick=(v:Record<string,string>|null,f:string|null)=>v?.en||v?.zh||f||''
export async function getPublishedArticles():Promise<Article[]>{const db=getSupabaseClient(),tenant=getTenantId();if(!db||!tenant)return[];const{data,error}=await db.from('articles').select('slug,title,title_i18n,excerpt,excerpt_i18n,content,content_i18n,published_at,featured_image').eq('tenant_id',tenant).eq('is_published',true).order('published_at',{ascending:false});if(error||!data)return[];return data.map(r=>({slug:r.slug||'',title:pick(r.title_i18n,r.title),excerpt:pick(r.excerpt_i18n,r.excerpt),content:pick(r.content_i18n,r.content),publishedAt:r.published_at||'',featuredImage:r.featured_image}))}
export async function getArticleBySlug(slug:string){return(await getPublishedArticles()).find(a=>a.slug===slug)||null}
