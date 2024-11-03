// import { Link, routes } from '@redwoodjs/router'
import {Metadata, useQuery} from '@redwoodjs/web'

import {useState, useEffect, useCallback} from 'react'
import {X, Search, User} from 'lucide-react'
import {Button} from "src/components/ui/button"
import {Input} from "src/components/ui/input"
import {ScrollArea} from "src/components/ui/scroll-area"
import Fuse from "fuse.js";
import {Link, routes} from '@redwoodjs/router'

const USER_QUERY = gql`
  query getAllUsersQuery {
    users {
      id
      name
      attestation
      qualification
      ct_preference
      rtg_preference
      occupation
    }
  }
`


const SearchUsersPage = () => {
  const {data, loading, error} = useQuery(USER_QUERY)
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(data?.users || [])
  let fuse;

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value)
    if (value.trim() === '') {
      setSearchResults(data?.users || [])
    } else {
      console.log("Fuse is", fuse)
      if (fuse) {
        const results = fuse.search(value)
        console.log("Searching ", value, " results are ", results)
        setSearchResults(results.map(result => result.item))
      }
    }
  }, [loading])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setIsOpen(prev => !prev)
      } else if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  console.log("Users", data)
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  fuse = new Fuse(data?.users || [], {
    keys: ['name'],
    threshold: 0.3,
  })


  return (
    <div>
      <h1 className="text-5xl font-bold text-center mb-8">Najít uživatele</h1>
      <div className="">
        <div className="container flex h-full items-start justify-center sm:items-center">
          <div className="relative w-full max-w-lg rounded-lg bg-card text-card-foreground shadow-lg">
            <div className="flex items-center border-b px-4 py-2">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50"/>
              <Input
                type="text"
                placeholder="Search users..."
                className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="ml-2 shrink-0"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-4 w-4"/>
                <span className="sr-only">Close</span>
              </Button>
            </div>
            {searchTerm.trim() !== '' && (
              <ScrollArea className="h-[50vh] overflow-y-auto">
                <div className="p-4">
                  {searchResults.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground">No users found.</p>
                  ) : (
                    <ul className="space-y-2">
                      {searchResults.map((user) => (
                        <Link to={routes.user({id: user.id})}>
                          <li key={user.id} className="flex items-center space-x-4 rounded-md p-2 hover:bg-accent">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                              <User className="h-6 w-6 text-primary-foreground"/>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">{user.name}</p>
                              <div className="flex flex-row space-x-2">
                                <p className="text-sm text-muted-foreground">{user.occupation}</p>
                                <p className="text-sm text-muted-foreground">{user.attestation}</p>
                                <p className="text-sm text-muted-foreground">{user.qualification}</p>
                              </div>
                            </div>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default SearchUsersPage
