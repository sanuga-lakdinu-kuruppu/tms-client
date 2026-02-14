import { FEATURES } from "@/constants/constants";

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to stay organized
          </h2>
          <p className="text-lg text-gray-600">
            Powerful features to help you manage tasks, track progress, and
            collaborate effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            const colors = {
              blue: "bg-blue-50 text-blue-600",
              green: "bg-green-50 text-green-600",
              purple: "bg-purple-50 text-purple-600",
              red: "bg-red-50 text-red-600",
              yellow: "bg-yellow-50 text-yellow-600",
              indigo: "bg-indigo-50 text-indigo-600",
            };

            return (
              <div
                key={idx}
                className="group p-6 bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all"
              >
                <div
                  className={`w-12 h-12 ${
                    colors[feature.color]
                  } rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
