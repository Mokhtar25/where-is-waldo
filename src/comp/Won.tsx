const Won = () => {
  return (
    <div className="absolute inset-0 left-0 right-0 top-56 mx-auto flex h-96 w-[600px] flex-col justify-center gap-8 overflow-hidden rounded border-8 border-zinc-700 bg-emerald-900 p-6 text-5xl">
      <div>Congrats, You Won. you found all targets click here to reset</div>
      <button className="text-2xl" onClick={() => window.location.reload()}>
        {" "}
        Click here to reset
      </button>
    </div>
  );
};

export default Won;
