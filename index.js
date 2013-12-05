var through = require('through');

module.exports = function(file){
	//console.log('file: ' + file)
	var data = ''
	return through(write, end)

	function write(buf){
		data += buf
	}
	
	function end() {
	    this.queue(removeIgnored(data));
	    this.queue(null);
	}
}


function removeIgnored(str){

	var lines = str.split('\n')
	var lastWasIgnore = false
	var res = ''
	for(var i=0;i<lines.length;++i){
		var line = lines[i]
		var tagIndex = line.indexOf('@browserify-ignore')
		var commentIndex = line.indexOf('//')
		//if(commentIndex !== -1) console.log(line)
		if(tagIndex !== -1 && commentIndex !== -1 && commentIndex < tagIndex){
			lastWasIgnore = true
			console.log('ignored tag line: ' + line)
		}else if(lastWasIgnore){
			lastWasIgnore = false
			console.log('ignored line: ' + line)
		}else{
			res += line + '\n'
		}
	}
	return res
}
