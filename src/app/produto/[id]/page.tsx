export default async function produtoDetails(context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
}