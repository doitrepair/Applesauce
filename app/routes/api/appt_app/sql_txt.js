
module.exports = {
	get_sched: function(begin, end){
		var query = "SELECT emp.Nick_Name, emp.Last_Name, sch.`date`,`8:00`, `8:30`, `9:00`, `9:30`, `10:00`, `10:30`, `11:00`, `11:30`, `12:00`, `12:30`, `13:00`, `13:30`, `14:00`, `14:30`, `15:00`, `15:30`, `16:00`, `16:30`, `17:00`, `17:30`\n" +
			"FROM SS_Employee as emp\n" +
			"JOIN SS_Group_Assignments as grp on emp.Employee_ID = grp.Employee_ID\n" +
			"JOIN SS_Schedule as sch on emp.Employee_ID = sch.agent\n" +
			"WHERE sch.`date` BETWEEN '" + begin + "' AND '" + end + "'\n" +
			"AND (`8:00`=70 OR `8:30`=70 OR `9:00`=70 OR `9:30`=70 OR `10:00`=70 OR `10:30`=70 OR `11:00`=70 OR `11:30`=70 OR `12:00`=70 OR `12:30`=70 OR `13:00`=70 OR `13:30`=70 OR `14:00`=70 OR `14:30`=70 OR `15:00`=70 OR `15:30`=70 OR `16:00`=70 OR `16:30`=70 OR `17:00`=70 OR `17:30`=70)";
		return query;
	},
	update_sched: function(begin, end, date, first, last){
		var query = "UPDATE SS_Schedule as sch\n" +
			"INNER JOIN SS_Employee as emp on emp.Employee_ID = sch.agent\n" +
			"SET sch.`"+begin+"`=64, sch.`"+end+"`=64\n" +
			"WHERE emp.Last_Name='"+last+"'\n" +
			"AND emp.First_Name='"+first+"'\n" +
			"AND sch.`date`='"+date+"'\n"
		return query;
	}
};
