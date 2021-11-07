import React, { useState } from "react";
import { useParams } from "react-router";
import './CreateProjectForm.css'

const CreatePledgeForm = () => {
  const { id } = useParams()
  const [pledgeData, setPledgeData] = useState({
    amount: "0",
    comment: "",
    anonymous: "false",
    project_id: id,
  });

  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setPledgeData({
      ...pledgeData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePledgeSubmit = (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_API_URL}pledges/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pledgeData),
    }).then((response) => {
      setSubmitMessage("Thank you for supporting this campaign.");
      return response.json();
    });
  };

  return (
    <div className='project-page'>
      <div className='proj-form'>
        <h3 className="sign2" align='center'>I can help!</h3>
      </div>
      <form className='form2' >
        <div>
          <input className='field2'
            name="amount"
            type="text"
            placeholder="Amount"
            onChange={handleChange}
          />
        </div>
        <div>
          <input className='field2'
            name="comment"
            type="text"
            placeholder="Comment"
            onChange={handleChange}
          />
        </div>
        {/* <div>
          <input
            name="project_id"
            type="text"
            id="project_id"
            placeholder="Project ID"
            onChange={handleChange}
          />
        </div> */}
        <button
          className='submit2'
          type='submit'
          onClick={handlePledgeSubmit}
        >
          Submit Pledge
        </button>
        <div>{submitMessage}</div>
      </form>
    </div>
  );
};

export default CreatePledgeForm;