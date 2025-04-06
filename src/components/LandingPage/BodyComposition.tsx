import { Activity, Dumbbell, Droplet, Scale } from "lucide-react";

export default function BodyComposition() {
  const cards = [
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Body Fat",
      description:
        "Measure the percentage of your total body mass that is composed of fat tissue.",
    },
    {
      icon: <Dumbbell className="w-6 h-6" />,
      title: "Body Fat",
      description:
        "Measure the percentage of your total body mass that is composed of fat tissue.",
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Body Fat",
      description:
        "Measure the percentage of your total body mass that is composed of fat tissue.",
    },
    {
      icon: <Droplet className="w-6 h-6" />,
      title: "Body Fat",
      description:
        "Measure the percentage of your total body mass that is composed of fat tissue.",
    },
  ];

  return (
    <div className="min-h-screen  p-6 md:p-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div className="max-w-lg">
              <h1 className="mb-4 text-4xl font-bold tracking-tight">
                Comprehensive Body Composition Analysis
              </h1>
              <p className="text-gray-600">
                Our system uses cutting-edge fitness sensors to provide you with
                a detailed analysis of your body composition, providing you with
                valuable insights to support your wellness journey.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl ${index === 0
                    ? "bg-black text-white hover:bg-slate-800"
                    : "bg-gray-100 hover:bg-slate-200"
                    }`}
                >
                  <div className="mb-4">{card.icon}</div>
                  <h3 className="mb-2 font-semibold">{card.title}</h3>
                  <p className="text-sm">{card.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-[320px] hidden md:block">
              <img
                src="https://res.cloudinary.com/dzsdfw5vx/image/upload/v1743934637/Screenshot_2025-04-06_154600-Photoroom_berczk.png"
                alt="FitSphere App Interface"
                className="w-full rounded-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
