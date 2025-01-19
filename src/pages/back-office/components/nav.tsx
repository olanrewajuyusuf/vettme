import images from "@/assets/Images";

const Nav = (title: string) => {
  return (
    <div className="w-full bg-white h-[70px] flex justify-between items-center px-0 md:px-5 mb-5 border-b-[1px] border-stroke-clr">
        <img src={images.logo} alt="Vettme" className="h-8 pl-5" />

        <div className="flex items-center px-[30px] gap-4">
            <span className="w-[40px] h-[40px] rounded-full text-blue-600 border-[1px] border-blue-400">
              {title.slice(0, 2).toUpperCase()}
            </span>
            <p className="font-medium">{title}</p>
        </div>
    </div>
  )
}

export default Nav;