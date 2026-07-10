import heroImage from "../../assets/images/hero.png";
import Container from "../ui/Container";
import Reveal from "./Reveal";

const images = [
  heroImage,
  heroImage,
  heroImage,
  heroImage,
  heroImage,
  heroImage,
];

export default function Gallery() {
  return (
    <section className="bg-white py-24">
      <Container>

        <Reveal>
          <div className="mx-auto max-w-3xl text-center">

            <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
              Gallery
            </span>

            <h2 className="mt-6 text-5xl font-bold text-slate-900">
              Classroom Moments
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              A glimpse of our classrooms, activities and learning environment.
            </p>

          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {images.map((image, index) => (

            <Reveal
              key={index}
              delay={index * 0.08}
            >

              <div className="group overflow-hidden rounded-3xl shadow-xl">

                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="h-72 w-full object-cover transition-all duration-700 group-hover:scale-110"
                />

              </div>

            </Reveal>

          ))}

        </div>

      </Container>
    </section>
  );
}