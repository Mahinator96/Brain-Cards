export const shuffle = (array) => {
/* 	var j, temp;
	for(var i = array.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = array[j];
		array[j] = array[i];
		array[i] = temp;
	} */
	return array = array.sort(() => Math.random() - 0.5);
/* 	var compare = madness();
	return array.sort(compare); */
};

/* //вспомогательная функция
function putToCache(elem, cache){
	if(cache.indexOf(elem) != -1){
		return;
	}
	var i = Math.floor(Math.random()*(cache.length + 1));
	cache.splice(i, 0, elem);
}

function madness(){
	var cache = [];
	return function(a, b){
		putToCache(a, cache);
		putToCache(b, cache);
		return cache.indexOf(b) - cache.indexOf(a);
	} */
// }