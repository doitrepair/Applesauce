
module.exports = {
	// Get 'Dayton' schedule from ACME (note, if a change is needed to Support
	// getting the schedule for multiple locations, then each '70' in the last
	// line would need to be updated to a input parameter)
	get_sched: function(begin, end, id){
			// Select all the columns that we want to return
		var query= "SELECT emp.Nick_Name, emp.Last_Name, emp.NetID, sch.`date`"+
			",`8:00`, `8:30`, `9:00`, `9:30`, `10:00`, `10:30`, `11:00`, "+
			"`11:30`, `12:00`, `12:30`, `13:00`, `13:30`, `14:00`, `14:30`, "+
			"`15:00`, `15:30`, `16:00`, `16:30`, `17:00`, `17:30`\n" +
			// Query SS_Employee table as emp
			"FROM SS_Employee as emp\n" +
			// Join with SS_Schedule based on acme's employee id
			"JOIN SS_Schedule as sch on emp.Employee_ID = sch.agent\n" +
			// Only select columns where the date is in-between the parameters
			"WHERE sch.`date` BETWEEN '" + begin + "' AND '" + end + "'\n" +
			// Only select columns with at least one time-slot being a 'Dayton'
			// shift (the id for a dayton shift is 70)
			"AND (`8:00`="+id+" OR `8:30`="+id+" OR `9:00`="+id+" OR `9:30`="
				+id+" OR `10:00`="+id+" OR `10:30`="+id+" OR `11:00`="
				+id+" OR `11:30`="+id+" OR `12:00`="+id+" OR `12:30`="
				+id+" OR `13:00`="+id+" OR `13:30`="+id+" OR `14:00`="
				+id+" OR `14:30`="+id+" OR `15:00`="+id+" OR `15:30`="
				+id+" OR `16:00`="+id+" OR `16:30`="+id+" OR `17:00`="
				+id+" OR `17:30`="+id+")";
		return query;
	},
	update_sched: function(begin, end, date, first, last){
			// Update SS_Schedule table
		var query = "UPDATE SS_Schedule as sch\n" +
			// Join with SS_Employee to get first and last name columns
			"INNER JOIN SS_Employee as emp on emp.Employee_ID = sch.agent\n" +
			// Set the employees as being in a appt shift (note, 1-this only
			// updates an agent to be in an appt, nothing else and 2-this only
			// updates the schedule for at most 2 timeslots because this updates
			// 'begin' AND 'end' not 'begin' through 'end')
			"SET sch.`"+begin+"`=64, sch.`"+end+"`=64\n" +
			// Only update if the first name, last name, and date all match our
			// parameters
			"WHERE emp.Last_Name='"+last+"'\n" +
			"AND emp.First_Name='"+first+"'\n" +
			"AND sch.`date`='"+date+"'\n"
		return query;
	}
};
