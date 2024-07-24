const Banner = () => {
  return (
    <div className="relative w-screen  h-[250px] bg-[url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-center bg-no-repeat">
      <div className=" bg-gradient-to-r from-blue to-pink opacity-75 w-full h-full text-center flex justify-center flex-col gap-y-3">
        <h1 className="text-4xl font-bold">Optimized Your Meals</h1>
        <p className="text-sm">
          Select Meal to Add in Week. You will be able to edit, modify and
          change the Meal Weeks.{" "}
        </p>
      </div>
    </div>
  );
};

export default Banner;
