// import { Link, routes } from '@redwoodjs/router'
import {Button} from 'src/components/ui/button'
import {Metadata} from '@redwoodjs/web'
import {Link, routes} from "@redwoodjs/router";

const SmenaPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <h1 className="mb-8 text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
        Plánování služeb
      </h1>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link to={routes.editUserSchedule({id: 1, type: 'weekly'})}>
          {/*TODO HARDCODED USER*/}
          <Button size="lg" className="text-lg px-6 py-3">
            Běžné směny
          </Button>
        </Link>
        <Link to={routes.editUserSchedule({id: 1, type: 'monthly'})}>
          {/*TODO HARDCODED USER*/}
          <Button size="lg" className="text-lg px-6 py-3">
            Noční a víkendové služby
          </Button>
        </Link>
        <Link to={routes.userSchedule({id: 1})}>
          <Button size="lg" variant="outline" className="text-lg px-6 py-3">
            Současný plán
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default SmenaPage
