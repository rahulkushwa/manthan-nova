export default function Stats() {
  const stats = [
    {
      number: "500+",
      title: "Students",
    },
    {
      number: "95%",
      title: "Success Rate",
    },
    {
      number: "10+",
      title: "Years Experience",
    },
    {
      number: "20",
      title: "Students / Batch",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 transition"
            >
              <h2 className="text-4xl font-bold text-blue-700">
                {item.number}
              </h2>

              <p className="mt-3 text-gray-600">
                {item.title}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}