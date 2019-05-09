function getProcess(start,end){
	var s = Date.parse(start);
	var e = Date.parse(end);
	var n = new Date().getTime();
	return (( n - s ) / ( e - s ) * 100).toFixed(2);
}

module.exports = {
	getProcess:getProcess
}