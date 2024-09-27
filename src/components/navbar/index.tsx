import { DropDownMenu } from './DropDownMenu'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { NavigationMenu } from './NavigationMenu'

export function Navbar() {
  return (
    <div className="flex border-b-2 bg-medium pl-2">
      <div className="mx-auto flex w-full max-w-5xl flex-col">
        <div className="flex items-center justify-between pt-5">
          <Breadcrumb />
          <DropDownMenu />
        </div>
        <NavigationMenu />
      </div>
    </div>
  )
}
