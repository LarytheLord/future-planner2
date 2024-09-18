import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Datasheet() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const { data, error } = await supabase
      .from('planner_data')
      .select('*')
    if (error) console.error('Error fetching data:', error)
    else setData(data)
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Planner Datasheet</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Task</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{item.date}</td>
              <td className="border border-gray-300 p-2">{item.task}</td>
              <td className="border border-gray-300 p-2">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}