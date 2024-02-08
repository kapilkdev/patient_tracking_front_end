import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import List from "./List";
import { DragDropContext } from "react-beautiful-dnd";

export const UiContainer = ({searchData}) => {
  const [opportunitiesData, setOpportunityData] = useState([]);
  const [leadsData, setLeadsData] = useState([]);
  const [qualifiedData, setQualifiedData] = useState([]);
  const [bookedData, setBookedData] = useState([]);
  const [treatedData, setTreatedData] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const apiUrl = "https://patient-tracking-backend.onrender.com"
  const handleDragEnd = (result) => {
    debugger
    console.log(process.env.REACT_APP_API_URL)
    const { destination, source, draggableId } = result;
    axios
      .put(`${apiUrl}/opportunities/${draggableId}/update_stage`)
      .then((response) => {
        setRefreshPage((previousState) => !previousState);
      });
  };

  useEffect(() => {
    axios.get(`${apiUrl}/opportunities`).then((response) => {
      setOpportunityData(response.data?.opportunities || []);
    });
  }, [apiUrl,refreshPage]);

  useEffect(() => {
    if (opportunitiesData.length > 0) {
      setLeadsData(
        opportunitiesData.filter((item) => item.procedure_name === "Lead")
      );
      setQualifiedData(
        opportunitiesData.filter((item) => item.procedure_name === "Qualified")
      );
      setBookedData(
        opportunitiesData.filter((item) => item.procedure_name === "Booked")
      );
      setTreatedData(
        opportunitiesData.filter((item) => item.procedure_name === "Treated")
      );
    }
  }, [opportunitiesData]);

  useEffect(()=>{
    setOpportunityData(searchData)
  },[searchData])

  return (
    opportunitiesData.length > 0 && (
      <div className="containers">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="main-container">
              <List
                title="Leads"
                data={leadsData}
                data_length =  {leadsData.length}
                droppableId="leads"
              />
              <List title="Qualified" data={qualifiedData} data_length =  {qualifiedData.length} droppableId="qualified" />
              <List title="Booked" data={bookedData} data_length =  {bookedData.length}droppableId="booked" />
              <List title="Treated" data={treatedData} data_length =  {treatedData.length}droppableId="treated" />
          </div>
        </DragDropContext>
      </div>
    )
  );
};
