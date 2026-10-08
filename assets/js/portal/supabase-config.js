/* Supabase connection details.
 *
 * Both values here are PUBLIC by design and are meant to ship in client code.
 * The publishable key identifies the project; it grants nothing on its own.
 * What protects partner data is Row Level Security in Postgres — see
 * supabase/01-schema.sql. An unauthenticated caller holding this key reads
 * nothing, because every policy requires auth.uid() to match a membership.
 *
 * The SECRET key must never appear in this folder or anywhere under site/.
 * It bypasses RLS entirely and this repository is published.
 */
window.MHG_SUPABASE = {
  url: 'https://hlieeqspepgirspztmqs.supabase.co',
  publishableKey: 'sb_publishable_ZYH_flSx3E98QJ19w5kOCQ_hRYDTgF5'
};
