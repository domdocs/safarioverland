"use client"

import { useState, useEffect } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DatabaseViewerPage() {
  const [tables, setTables] = useState<string[]>([])
  const [selectedTable, setSelectedTable] = useState<string>("")
  const [tableData, setTableData] = useState<any[]>([])
  const [columns, setColumns] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTables() {
      setLoading(true)
      setError(null)

      try {
        const supabase = getSupabaseBrowserClient()
        if (!supabase) {
          throw new Error("Supabase client not initialized")
        }

        // Get list of tables
        const { data, error } = await supabase
          .from("information_schema.tables")
          .select("table_name")
          .eq("table_schema", "public")
          .order("table_name")

        if (error) throw error

        const tableNames = data.map((t) => t.table_name)
        setTables(tableNames)

        if (tableNames.length > 0) {
          setSelectedTable(tableNames[0])
        }
      } catch (err) {
        console.error("Error fetching tables:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch tables")
      } finally {
        setLoading(false)
      }
    }

    fetchTables()
  }, [])

  useEffect(() => {
    async function fetchTableData() {
      if (!selectedTable) return

      setLoading(true)
      setError(null)

      try {
        const supabase = getSupabaseBrowserClient()
        if (!supabase) {
          throw new Error("Supabase client not initialized")
        }

        // Get table data
        const { data, error } = await supabase.from(selectedTable).select("*").limit(100)

        if (error) throw error

        setTableData(data || [])

        // Extract column names from the first row
        if (data && data.length > 0) {
          setColumns(Object.keys(data[0]))
        } else {
          setColumns([])
        }
      } catch (err) {
        console.error(`Error fetching data from ${selectedTable}:`, err)
        setError(err instanceof Error ? err.message : `Failed to fetch data from ${selectedTable}`)
        setTableData([])
        setColumns([])
      } finally {
        setLoading(false)
      }
    }

    fetchTableData()
  }, [selectedTable])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Database Viewer</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Supabase Tables</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && tables.length === 0 ? (
            <div className="text-center py-4">Loading tables...</div>
          ) : tables.length === 0 ? (
            <div className="text-center py-4">No tables found</div>
          ) : (
            <Tabs value={selectedTable} onValueChange={setSelectedTable}>
              <TabsList className="mb-4 flex flex-wrap">
                {tables.map((table) => (
                  <TabsTrigger key={table} value={table} className="mb-1">
                    {table}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={selectedTable}>
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedTable}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="text-center py-4">Loading data...</div>
                    ) : tableData.length === 0 ? (
                      <div className="text-center py-4">No data found in this table</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              {columns.map((column) => (
                                <TableHead key={column}>{column}</TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {tableData.map((row, rowIndex) => (
                              <TableRow key={rowIndex}>
                                {columns.map((column) => (
                                  <TableCell key={column}>
                                    {typeof row[column] === "object"
                                      ? JSON.stringify(row[column])
                                      : String(row[column] ?? "")}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
