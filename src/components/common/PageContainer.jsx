import clsx from "clsx";

export default function PageContainer({
  children,
  className = "",
  fluid = false,
}) {

  return (

    <div
      className={clsx(

        "w-full",

        fluid
          ? "px-4 py-6 sm:px-6 lg:px-8"
          : "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8",

        className

      )}
    >

      {children}

    </div>

  );

}