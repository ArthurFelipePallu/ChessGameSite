import { MENU_ITEMS } from "../../../../models/Site Layout/MenuItemDto"

export function SideMenu() {
  return (
    <aside className="w-40 bg-slate-900 text-white  space-y-2">
      {MENU_ITEMS.map((item) => (
        <div key={item.label} className="relative group">
          <div className="cursor-pointer pl-3 py-2 rounded hover:bg-slate-700">
            {item.label}
          </div>

          {/* Hover popup */}
          <div className="absolute left-full top-0 hidden group-hover:block">
            <div className="bg-gray-900 text-white-900 rounded shadow-lg min-w-[180px] ">
              {item.options.map((opt) => (
                <div
                  key={opt}
                  className="px-3 py-2 rounded hover:bg-slate-100 cursor-pointer"
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </aside>
  )
}
