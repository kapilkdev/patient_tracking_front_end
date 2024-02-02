import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import List from "./List";
import { DragDropContext } from "react-beautiful-dnd";

export const UiContainer = () => {
  const [opportunitiesData, setOpportunityData] = useState([]);
  const [leadsData, setLeadsData] = useState([]);
  const [qualifiedData, setQualifiedData] = useState([]);
  const [bookedData, setBookedData] = useState([]);
  const [treatedData, setTreatedData] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    axios.put(`http://localhost:3000/opportunities/${draggableId}/update_stage`).then((response) => {
      setRefreshPage((previousState)=>!previousState)
    })
    console.log(destination, "destination");
    console.log(source, "destination");
    console.log(draggableId, "destination");

  };

  const leadCount = opportunitiesData.reduce((count, opportunity) => {
    if (opportunity.procedure_name === "Lead") {
      return count + 1;
    }
    return count;
  }, 0);
  
  console.log("Number of Leads:", leadCount);
  useEffect(() => {
    axios.get("http://localhost:3000/opportunities").then((response) => {
      setOpportunityData(response.data?.opportunities);

      setLeadsData(
        response.data.opportunities.filter(
          (item) => item.procedure_name === "Lead"
        )
      );
      setQualifiedData(
        response.data.opportunities.filter(
          (item) => item.procedure_name === "Qualified"
        )
      );
      setBookedData(
        response.data.opportunities.filter(
          (item) => item.procedure_name === "Booked"
        )
      );
      setTreatedData(
        response.data.opportunities.filter(
          (item) => item.procedure_name === "Treated"
        )
      );
    });
  }, [refreshPage]);


  return (
    <div className="containers">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="main-container">
          <List title="Leads" data={leadsData} droppableId="leads" />
          <List
            title="Qualified"
            data={qualifiedData}
            droppableId="qualified"
          />
          <List title="Booked" data={bookedData} droppableId="booked" />
          <List title="Treated" data={treatedData} droppableId="treated" />
        </div>
      </DragDropContext>
    </div>
  );
};
