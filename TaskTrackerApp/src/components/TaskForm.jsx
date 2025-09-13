import React, { useState } from "react";
import "./TaskForm.css";
import Tag from "./Tag";

const TaskForm = ({setTasks}) => {
	// one state var. 'taskData' which is an obj{} for handling
	// all input fields like task? ,status? ,tags?,etc..
	const [taskData, setTaskData] = useState({
		task: "",
		status: "todo",
		tags: [],
	});

	// remove or add current 'tag' from taskData's tags[] array
	const selectTag = (tag) => {
		// if tags are already present in taskData? Below 'some' method Returns T/F.
		if (taskData.tags.some((item) => item === tag)) { // True cond.
			const filterTags = taskData.tags.filter((item) => item !== tag); // remove current tag from tags[]
			setTaskData((prev) => {
				return { ...prev, tags: filterTags };
			});
		} 
		else { // False cond.
			setTaskData((prev) => {
				return { ...prev, tags: [...prev.tags, tag] }; // add current tag in tags[]
			});
		}
	};
		
	// determines if a tag is currently selected or not and return T/F.
	const checkTag = (tag) => {
     return taskData.tags.some(item => item === tag);
	}

	// one single func. to handle all form changes and updation
	const handleChange = (e) => {
		const { name, value } = e.target; // get name and value from event obj.

		// { here prev is previous value of taskData}
		setTaskData((prev) => {
			// {...prev spreding all current properties of taskData like task,status }
			return { ...prev, [name]: value }; // { return updated value of taskData, preserving exisiting taskData properties}
		});
	};

	// calls() when user clicks on 'add' task Button which is of type="submit".
	const handleSubmit = (e) => {
		e.preventDefault();  
		// set taskData obj{} inside tasks[] array
		setTasks(prev =>{ 
			return [...prev,taskData]
		})
	};

	return (
		<div>
			<header className="app_header">
				<form className="header_form" onSubmit={handleSubmit}>
					<input
						className="task_input"
						type="text"
						placeholder="Enter Your Task..."
						name="task"
						onChange={handleChange}
					/>

					<div className="task_form_bottom_line">
						<div>
							<Tag 
							tagName="HTML"       // passing tagName to "Tag" child comp. 
							selectTag={selectTag} // we are passing the function ref. itself, not calling it now and called() by child comp. later when "click" event triggered by user.
							selected={checkTag("HTML")} // we are calling the function now and passing its result(T/F) to child comp.
							/>
							<Tag 
							tagName="CSS" 
							selectTag={selectTag} 
							selected={checkTag("CSS")} 

							/>
							<Tag 
							tagName="JAVASCRIPT" 
							selectTag={selectTag} 
							selected={checkTag("JAVASCRIPT")} 

							/>
							<Tag 
							tagName="REACT" 
							selectTag={selectTag} 
							selected={checkTag("REACT")} 

							/>
						</div>

						<div>
							<select
								className="task_status"
								name="status"
								onChange={handleChange}>
								<option value="todo">todo</option>
								<option value="doing">doing</option>
								<option value="done">done</option>
							</select>

							<button type="submit" className="task_submit">
								ADD TASK
							</button>
						</div>
					</div>
				</form>
			</header>
		</div>
	);
};

export default TaskForm;
