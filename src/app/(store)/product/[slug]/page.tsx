export default function ProductPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-800">Product: {params.slug}</h1>
        <p className="text-gray-500 mt-2">Coming soon...</p>
      </div>
    </main>
  );
}
