import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const stages = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

export default function SalesPipelineTracking() {
  const [opportunities, setOpportunities] = useState({});

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    const response = await fetch('http://localhost:5000/api/sales/opportunities');
    const data = await response.json();
    const groupedOpportunities = data.reduce((acc, opp) => {
      if (!acc[opp.stage]) acc[opp.stage] = [];
      acc[opp.stage].push(opp);
      return acc;
    }, {});
    setOpportunities(groupedOpportunities);
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newOpportunities = { ...opportunities };
    const [movedOpportunity] = newOpportunities[source.droppableId].splice(source.index, 1);
    movedOpportunity.stage = destination.droppableId;
    
    if (!newOpportunities[destination.droppableId]) {
      newOpportunities[destination.droppableId] = [];
    }
    newOpportunities[destination.droppableId].splice(destination.index, 0, movedOpportunity);

    setOpportunities(newOpportunities);

    // Update the backend
    await fetch(`http://localhost:5000/api/sales/opportunities/${draggableId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage: destination.droppableId }),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex space-x-4 overflow-x-auto">
            {stages.map((stage) => (
              <div key={stage} className="flex-1 min-w-[200px]">
                <h3 className="font-semibold mb-2">{stage}</h3>
                <Droppable droppableId={stage}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="bg-gray-100 p-2 rounded min-h-[200px]"
                    >
                      {opportunities[stage]?.map((opp, index) => (
                        <Draggable key={opp._id} draggableId={opp._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-2 mb-2 rounded shadow"
                            >
                              <p className="font-medium">{opp.name}</p>
                              <p className="text-sm text-gray-600">${opp.value}</p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </CardContent>
    </Card>
  );
}