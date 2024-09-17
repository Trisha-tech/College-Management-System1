'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'

// Mock data for each section
const mockData = {
  students: [
    { id: 1, name: 'John Doe', email: 'john@example.com', course: 'Computer Science' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', course: 'Engineering' },
  ],
  courses: [
    { id: 1, name: 'Computer Science', duration: '4 years', department: 'IT' },
    { id: 2, name: 'Engineering', duration: '4 years', department: 'Engineering' },
  ],
  faculty: [
    { id: 1, name: 'Dr. Alice Johnson', department: 'Computer Science', position: 'Professor' },
    { id: 2, name: 'Prof. Bob Williams', department: 'Engineering', position: 'Associate Professor' },
  ],
  library: [
    { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', available: 'Yes' },
    { id: 2, title: 'Data Structures and Algorithms', author: 'Michael T. Goodrich', available: 'No' },
  ],
  admin: [
    { id: 1, name: 'Admin User 1', role: 'System Administrator', department: 'IT' },
    { id: 2, name: 'Admin User 2', role: 'Finance Manager', department: 'Finance' },
  ],
  inventory: [
    { id: 1, item: 'Laptops', quantity: 50, department: 'IT' },
    { id: 2, item: 'Projectors', quantity: 20, department: 'Facilities' },
  ],
}

type Section = keyof typeof mockData

export default function CollegeManagementSystem() {
  const [activeTab, setActiveTab] = useState<Section>('students')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  const handleCreate = () => {
    setEditingItem(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    // In a real application, you would delete the item from the database here
    console.log(`Deleting item with id ${id} from ${activeTab}`)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // In a real application, you would save the data to the database here
    console.log('Saving data:', editingItem || 'New Item')
    setIsDialogOpen(false)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-black">College Management</h1>
        <nav>
          {Object.keys(mockData).map((section) => (
            <button
              key={section}
              className={`block w-full text-left p-2 rounded ${
                activeTab === section ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 text-black'
              }`}
              onClick={() => setActiveTab(section as Section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Section)}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              {Object.keys(mockData).map((section) => (
                <TabsTrigger key={section} value={section}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
            <Button onClick={handleCreate}>
              <PlusCircle className="mr-2 h-4 w-4" /> Create New
            </Button>
          </div>
          {Object.entries(mockData).map(([section, data]) => (
            <TabsContent key={section} value={section}>
              <Table>
                <TableHeader>
                  <TableRow>
                    {Object.keys(data[0]).filter(key => key !== 'id').map((header) => (
                      <TableHead key={header}>{header.charAt(0).toUpperCase() + header.slice(1)}</TableHead>
                    ))}
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id}>
                      {Object.entries(item).filter(([key]) => key !== 'id').map(([key, value]) => (
                        <TableCell className='text-black' key={key}>{value as string}</TableCell>
                      ))}
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                          <Pencil className="h-4 w-4 text-black" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4 text-black" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          ))}
        </Tabs>
      </main>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit' : 'Create'} {activeTab.slice(0, -1)}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            {Object.keys(mockData[activeTab][0]).filter(key => key !== 'id').map((field) => (
              <div key={field} className="mb-4">
                <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                <Input
                  id={field}
                  name={field}
                  defaultValue={editingItem ? editingItem[field] : ''}
                />
              </div>
            ))}
            <Button type="submit">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}