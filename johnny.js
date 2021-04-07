(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"johnny_atlas_1", frames: [[1202,0,585,296],[1202,298,585,296],[0,0,1200,647],[1202,596,585,296],[0,649,1200,647],[0,1770,500,215],[502,1770,500,215],[0,1298,871,470],[1004,1770,500,215],[873,1298,871,470]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_12 = function() {
	this.initialize(ss["johnny_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["johnny_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["johnny_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["johnny_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["johnny_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["johnny_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["johnny_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["johnny_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["johnny_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["johnny_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.your = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgtEjQhRgPhhgcQgSgGgKgFQgPgIgHgLQgIgNAAgdQAAg0AKhSIARiGIAFhPIADhPQABgWAHgJQAFgHAJgCQAJgCAFAFQAGAEACANQATBVgNCJQgRC6AAAmQA4AVA5AOQgBgIADgKIAEgSQADgNADgXIAGglQABgHAMgoQASg9AThqQAXh+AKgsQACgMAEgEQAHgJAJADQAIADACARQACAVgDAiQgEBWgbB/IgtDSQgDASgEAJQBnATBrgEQAOgBAFgEQAGgFABgQQAWjjALiSQACgRACgJQADgOAHgKQAGgHAHgCQAHgCAGAEQAGADAFAGQAJAMADASQACAMgBAVQgCA5gLBzQgLBzgCA6QAAAXgCALQgCASgHANQgPAZgiALQgWAIgnAAIgOAAQhPAAhXgPg");
	this.shape.setTransform(234.93,34.8936);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AnnIFQgMgGgFgPQgFgOAEgOQAEgMAKgMIATgVQAygyAyg4QAlgrAYggQAfgrAVgnQAyhggEhZQgCgUgIgHQgHgGgTgBQhLgChLABIgfAAQgRgBgNgEQgjgJgOgZQgIgPAAgWQAAgOAEgYQAPhJAYhXQAQg5AfhlQAEgMAGgHQAHgJAJACQAMADADATQAFAYgEAgQgDASgJAlQgcBxgXBxQgDAPAEAGQAFAHASAAICLABQAsAAAaAGQAlAKASAYQATAZABAyQABCqiVC4QgdAjgnArIhIBLQgbAbgUAAQgGAAgGgCgAC+HOQhRgOhhgdQgRgFgKgGQgPgHgHgMQgIgNAAgcQAAg1AKhSIARiGIAFhPIADhOQABgWAHgJQAEgHAJgDQAJgCAFAFQAGAFACAMQATBWgNCIQgRC6AAAnQA4AVA5ANQgBgHADgKIAEgTQADgNADgXIAGgkQABgHAMgpQASg9AThrQAXh9ALgrQACgMAEgFQAHgJAJADQAIAEACAQQACAVgDAiQgEBWgbB/IguDTQgDASgEAJQBoATBrgEQAOgBAFgFQAGgFABgPQAWjlALiRQACgRACgJQADgOAHgJQAGgIAHgCQAHgBAGADQAGAEAFAFQAJAMADASQACALgBAWQgCA5gLB0QgLBygCA7QAAAXgCAKQgCATgHAMQgPAagiALQgWAHgnABIgOAAQhPAAhYgQg");
	this.shape_1.setTransform(211.33,17.7091);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Ak6LmQgMgEgHgKQgJgOgCghIgFh8QgDhOgDguQgEg9ghkHQgYjFADh+QABgagLgJQgIgHgTACQgjACg1AHIhXAMQhoANhEgPQgUgEgCgMQgCgJAKgGQAIgFALgCIE1gtQAhgFASABQAcACATANQAWAQAJAiQAGAXABApQADB8AoFDQAjEagHClQgCAfgOAJQgFADgHAAQgFAAgFgCgAi5EkQgMgGgFgPQgFgOAEgOQAEgMAKgMIATgVQAygyAyg4QAlgrAYggQAegqAVgnQAyhggEhaQgCgUgIgHQgHgGgTgBQhKgChLABIgfAAQgRgBgNgEQgjgJgOgZQgIgPAAgWQAAgOAEgYQAPhJAYhXQAQg5AfhlQAEgMAGgHQAHgJAJACQAMADADATQAFAYgEAgQgDASgJAlQgcBxgXBxQgDAPAEAGQAFAHASAAICKABQAsAAAaAGQAlAKASAYQATAZABAyQABCriVC3QgcAjgnArIhIBLQgbAbgUAAQgGAAgGgCgAHsDtQhRgOhhgdQgSgFgKgGQgPgHgHgMQgIgNAAgcQAAg1AKhRIARiGIAFhPIADhPQABgWAHgJQAFgHAJgDQAJgCAFAFQAGAFACAMQATBWgNCJQgRC5AAAnQA4AVA5ANQgBgHADgKIAEgTQADgNADgXIAGgkQABgHAMgpQASg8AThrQAXh+ALgrQACgMAEgFQAHgJAJADQAIAEACAQQACAVgDAiQgEBXgbB/IguDSQgDASgEAJQBoATBrgEQAOgBAFgFQAGgFABgPQAWjkALiRQACgSACgJQADgOAHgJQAGgIAHgCQAHgBAGADQAGAEAFAFQAJAMADASQACAMgBAWQgCA5gLB0QgLBxgCA7QAAAXgCAKQgCATgHAMQgPAagiALQgWAHgnABIgOAAQhPAAhYgQg");
	this.shape_2.setTransform(181.1198,40.2107);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},2).wait(123));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(99.1,-34.2,164.1,148.9);


(lib.speechbubble2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2_copy
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("A88QBQr/moAApZQAApYL/moQMAmpQ8AAQQ+AAL+GpQMAGoAAJYQAAJZsAGoQhzBAh6A2QmLCvnVBLQliA5mNAAQw8AAsAmpg");
	this.shape.setTransform(261,142.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("A/XRNQgigUgsgFQgfgEgyACIhSADQhQgBhLgZQhvgkghhLIgWhJQgGgXgLgQQAoicBIitQEmq/KvpdQGDARGBAmIgIApQi+AwjCgPQgtgDgOAAQgigBgZAGQgeAHgXATQgZAVgGAcQgHAgAVAhQATAeAhAQQAcANAmAEQAXADAvAAIT+gFQggANgsADQgSABg+AAQgxAAgeAFQgrAHgeATQgjAWgPAnQgQApASAhQASAiAvANQAhAKA2AAINVAAQAOAmAoAZQAjAXAuAIQAgAFA2AAQBCABAUABQAwAEBLAUQBeAYAcAFQBeASBkgKIgcA4QCHBZC9BjQGQDQFLBDQufF7qYhWQh7CFiMCCIjRAuQiPAfhiAMQhTAKhqAEQg1ABiIABQmdADoEAQQk2AKprAYQgQgigmgXgAweyFIAHAHIgYAFIARgMg");
	this.shape_1.setTransform(365.975,135.8875);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-2.9,625.7,290);


(lib.speechbubble = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ALWPqQlXA0l/AAQwxAAr3mdQr3meAApHQAApJL3mdQL3meQxAAQQyAAL2GeQL4GdAAJJQAAJHr4GeQhoA5hvAxQAyCaBVDDQC2GeDYEDQvBkdnPnig");
	this.shape.setTransform(259.2,176.875);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,518.4,353.8);


(lib.small = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AiPH0QgKgCgIgIQgGgHgEgLQgEgNABgcQADgoAJhlQAIhaADg0QACgtAAiGQAAhxAGhDQACgVAEgJQAIgRAPgCQAJgBAJAGQAIAFAEAJQAGALACAZQARDzgVD0IgHBIQgEArgCAdQgBAjgIAPQgGAMgLAHQgJAGgJAAIgGgBgAC6hGQgUgRAIgvQAThwACgWQAKhMgFg7QgBgIgDgDQgDgEgJAAQhCgHiMADQiHAEhHgIQgWgCgLgHQgIgEgFgIQgFgIABgIQAAgJAHgHQAGgGAJgDQAIgDAKgBIASAAQA6ABCDgFQB6gGBDADQAkACAXAHQAgALAPAXQAMASACAhQAEAngFA6QgFBAgVB/IgFAYQgFAOgIAHQgKAJgNAAIgCAAQgNAAgJgHg");
	this.shape.setTransform(261.9993,20.8783);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("ADFIpQgKgCgHgIQgHgHgDgLQgFgNACgcQACgoAKhlQAIhaACg0QACgtAAiHQAAhwAGhDQACgVAFgJQAHgRAQgCQAIgBAJAGQAIAFAEAJQAGALACAZQASDzgWD0IgGBIQgFArgBAdQgCAjgIAPQgGAMgLAHQgJAGgJAAIgGgBgApkAmQgGgJgBgOIgBgXQAEh0AVjmIAGhFQACgPADgHQADgFAFgDQAFgEAFABQAIABAGAJQADAHACALQALBQgHCCQgJClABAuQA9gFB6gRQBsgNBKALQAPjeAEjQQg0A0gZAcQgpAugbApIgMASQgHAJgIAGQgJAHgLABQgMABgIgGQgHgFgCgJQgDgIABgJQACgNALgSQAUghAfgkQASgUAogqIA/hAIAUgTQAMgKALgFQAOgFAOABQAOACAKAJQAIAJACAOQACAKAAARQgCB1gKDOIgHCkQgCAYgEALQgIAVgRAFQgLADgQgGIgbgMQgYgJgsAAQgyABhTALQhmAOgfACIgQABQgtAAgPgXgAIPgRQgTgRAIgvQAShwADgWQAJhMgFg7QAAgIgDgDQgDgEgKAAQhCgHiMADQiIAEhGgIQgWgCgLgHQgJgEgEgIQgFgIAAgIQABgJAGgHQAHgGAJgDQAHgDAKgBIASAAQA7ABCDgFQB6gGBDADQAlACAWAHQAhALAPAXQALASADAhQADAngEA6QgFBAgVB/IgGAYQgFAOgIAHQgJAJgOAAIgBAAQgNAAgKgHg");
	this.shape_1.setTransform(227.8266,15.5652);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AsHIyQgHgPgCgWQgCgNABgZQADhcAJhyIAUjOIA8pDQACgXADgMQAFgTAJgNQAGgIAHAAQAMAAACAWQADAlABA+QACCogZD9IgpGkQgEA9gDAZQgGAwgKAkQgHAZgPABIgCABQgMAAgJgSgAFqIpQgKgCgHgIQgHgHgDgLQgFgNACgcQACgoAKhlQAIhaACg0QACgtAAiHQAAhwAGhDQACgVAFgJQAHgRAQgCQAIgBAJAGQAIAFAEAJQAGALACAZQASDzgWD0IgGBIQgFArgBAdQgCAjgIAPQgGAMgLAHQgJAGgJAAIgGgBgAm/AmQgGgJgBgOIgBgXQAEh0AVjmIAGhFQACgPADgHQADgFAFgDQAFgEAFABQAIABAGAJQADAHACALQALBQgHCCQgJClABAuQA9gFB6gRQBsgNBKALQAPjeAEjQQg0A0gZAcQgpAugbApIgMASQgHAJgIAGQgJAHgLABQgMABgIgGQgHgFgCgJQgDgIABgJQACgNALgSQAUghAfgkQASgUAogqIA/hAIAUgTQAMgKAKgFQAOgFAOABQAOACAKAJQAIAJACAOQACAKAAARQgCB1gKDOIgHCkQgCAYgEALQgIAVgRAFQgLADgPgGIgbgMQgYgJgsAAQgyABhTALQhmAOgfACIgQABQgtAAgPgXgAK0gRQgTgRAIgvQAShwADgWQAJhMgFg7QAAgIgDgDQgDgEgKAAQhCgHiMADQiIAEhGgIQgWgCgLgHQgJgEgEgIQgFgIAAgIQABgJAGgHQAHgGAJgDQAHgDAKgBIASAAQA7ABCDgFQB6gGBDADQAlACAWAHQAhALAPAXQALASADAhQADAngEA6QgFBAgVB/IgGAYQgFAOgIAHQgJAJgOAAIgBAAQgNAAgKgHg");
	this.shape_2.setTransform(211.3203,15.5556);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_2}]},35).to({state:[]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-42.4,290,115.9);


(lib.johnnyear = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// highlight
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFCCAD").s().p("EAB/AqdQgngLgogZQgfgTgnggQhOhAgrg1QgegmgcgzQgUgjgKgdQgPgyABhEQAChMAWg+QgLAJgLAFQgZAMgcgFQgcgFgPgVQgUgbAKg6QAPhXAlhQQgYAFgWgSQgUgQgHgZQgGgWAEgbQADgUAJgdIA0iWQAPgpAKgjQgHgCgHgEQgXgMgIgXQgJgYAIgeQAGgVARghIA0hiIAAgEIAAhjQgHgHgFgJQgMgTAAgWQgCghAagmQAAhZgCg7QgGjQgXilQgFghAGgXQAHgeAYgGQAOgEAOAIQAOAHAJAOQALASAFAoIAIBJQAOgXAagMQAZgNAbADQAbAEAWARQAWARAKAZIAHAYQAEAOAFAJQAEAJALALIARATQAZAigEA6QgEBAgfA4QgQAcgDANQgBAHAAAMIgBAUQgCAUgMAaIgWArQgIATgHAbIgKAvQgPBCgjBNQgRAlghA+QgDAugEAkQAFBQADBQQAhgFAVASQAVASgBAiQAAAdgQAfIgdA3QgOAgACAZQAvgjAvgfQApgdAbACQAOABAMAHQAVAEAQANQATAPAIAXQAJAYgFAYQAigMAjgeIA8g5QAkgiAdgSQAogXAlAAQALAcggAiIgYAbQgMAPgCAPQAXAMAMAYQAMAYgGAYQgGAYgkAkQgkAlgHAYQATANAKAYQAJAWgBAZQgBAWgIAZIgQAtQAagTARgKQAZgPAXgFQAbgGAZAGQAcAHAPAUQAQAUAEAlIAGA/IAIAhQAGAVABAMQADApgbArQgRAdgpArQgkAlgSAQQggAcgdAPIgWAMQgMAIgGAJQgEAHgDAMIgEAUQgGAVgSAQQgRAPgXAHQgRAFgTAAQgZAAgcgIgAicMMQACgeAAgqQAAgZgDgOQgDgOgGgKQAGBEAEBDgEgkvAbwQg9gagbhRQgTg5gCheIgSsMQgsAEgogdQgmgcgTgsQgQgmgFgzQgDghABg7QALxVhbxLQgCgWAKgTQALgVARAJQALAFAFAWQBtHBA+HOIAblfQAFg9AMgkQASgzAmgTQAqgVAxAXQAvAWAXAtQATAoACA1QACAngHA7QgJBJgBAYQgCA3ANApQAvggA8AAQA8AAAwAfQAAg/ADgiQAFg2AQgoQATgvAlggQAogiAvgDQBJgDAvBHQAtBFgPBMQATAZAmAGQAfAFAmgIIBDgQQAngIAcAGQBwAaAHDUIAQG2QADBMgIAsQgKBBgkAmQgKALgjAbQgcAWgMASQgSAagGArQgEAagEAzQgGAzgYAqQgZAtgnAaQgqAcgzgBQg1gCgjggIh6NVQgKBGgKAmQgOA7gaApQgfAxgxAaQg1AcgzgNQADBWgEAuQgGBJgaA0QgfA9g9AfQgmAUgjAAQgaAAgYgLgASGJMQgMgBgJgHQgKgHADgKQABgGAGgGIAKgKQAFgGADgMIAGgVQAFgMAOgNIAagVQAVgSAUgeIAig4QAuhMA4hBQAYgcAyg2QAsgyAWgiQAKgPAQgcIAagqQA0hRBTg1QAIATgEAaQgDARgKAbQgbBEgZAwQggA9gkAvIgzA/IglAtQgKAKgVARQgWASgJAKQgfAdgnBEQgqBJgZAbQgRATgoAgQgWASgPAJQgVALgTAAIgCAAgEAjcgC/QgKgKABgbQAEhpBCiLQBRibAhhQQA6iJAYiyQARiEACjFQABhggDhAQgDhYgLhIQgai0hPinQhQioh7iGQgogrgigaQgsghgsgNQgOgEgEgGQgHgMAQgPQATgRAdgGQAagFAcAHQApAKA2ApQDJCXCTEhQAuBbAZBIQAiBoAOCAQALBjAACMQgBDygeCyQgmDihcCrQgaAxgmA6QgWAhgxBHIhTB3QgRAXgVALQgLAFgJAAQgLAAgIgJgAa4qkQgagtg/hGQhEhNgZgkIgYgmQgPgWgNgOQgNgOgcgWQgdgYgMgMQgPgPgSgbIgfgsIgegjQgSgWgKgPQgMgSgMgdIgUgyQgOgfgbgyQghg9gKgUQgwhkAEhLQAAgIAEgGQAEgHAGAAQAKABACAVQADAVAOAWQAIAMAVAYQBiByA1BiQAeA3ALAPIAXAcIAYAbIAiArQAVAcANAPQAQARAhAfQAiAfAPARQAZAbAoA+QA0BRATAsQAfBBAKBKQAEAfgRAFIgFAAQgNAAgNgWgAGOrKQglgWgRgMQgcgUgTgUQgfgjgehDQgmhUgJg/QgEggABhNIAEhmQAHhmAdhiQAPg1AVgdQAdgqArgHQANgCAGAFQAKAHgDAQQgBAGgIARQgIASgCAoIgDA9QgJCpACBJQABAuADAsQAEArAFAVQAEARAQAuQAmBqAVB2QACALgDAEQgEAEgFAAQgGAAgJgFgAbFvkQgLgCgNgTQg6hRgWg0QgPgjgMgtQgIgdgLg2QgWhpgIg7QgMhcAGhKIACgnQABgWgFgQQgDgJgIgSQgJgSgDgJQgLgoAUgiQAGgKANgPQAOgQAFgIIAOgWQAIgOAIgHQASgPAZACQAaADAOATQAIAMAEATIAIAiQAEAMAKAWQAHAVAAAOQgBAPgJAVIgOAjQgIAYACAyQADBSAEAwQAGBHAMA4QAHAiASBBQAbB3ADB6QAAAcgHANQgEAJgJAGQgIAEgHAAIgFgBgEALFghCQgMgJAEgTQACgPAMgQQBtiaCMh5QCPh9CkhSQBagsBEgPQBJgQBnAIQBgAJAXAxQAMAagKAdQgJAdgZARQgTANgcAFQgSADgiACQhnADgyAMQg7APhYAzQhbA0iyB1QiwB0heA1QgTALgMAAQgJAAgFgEg");
	this.shape.setTransform(404.0333,483.8662);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// ear_lines
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6E5140").s().p("Auja9QgjgmgChSQgDiKA5ieQARgvAWgvQATgrAGgSQALgkgEgcQgCgSgIgSQgKgIgIgKQgMgRgIgTIgYgbIgJgLQglgogrgyQgggogTgbQgagngNgkQgVg7AAhgQAAhEAGhAQAQiaA3iHQAdhIAngbQAYgRAhgHIAFgBQAZgEArgCQB3gFBeAEQAiABAUAEIArAAQA9AAAhAFQAzAJAiAXIAFAEQARADAPAGQAhAMAkAaQAYARAlAiQAxAsAYAeQAjAtAKAtQAJAmgUAQQgKAJgRgBQgMAAgTgGQgwgOgYgJQgmgOgdgSIg2gmIgWgOIgLAFQgQAGgeAEQgjAEgLADQggAHgkAaQguAfghArQg2BIgXCCQgLA9gMB9QgFA0AAAeIAGAIQBNBeAJBdQAHBHghBeQgSA2gsBqQgeBVgIBgQgFA6gDASQgIAqgWAZQgcAhgwABIgCAAQgvAAgdgggAQECWQgGgGAAgPIgSpQQgBgqAJgSQAIgOAOgIQAPgHANAFQAaALABAyQADBdAIBpIAMCQQAGBSgDA+QgCAygLAgQgOAsgfAVQgKAHgIAAQgGAAgFgEgAkkjVIgKgDQgVgHgRgTQgxg4gLhdQgFgjABguIADhOIAAgDQAEi0AGhaQALiaAkhtQATg6AhhDQAWgsArhNQAXgpATgfQAdguAUgZQAvg7BVhDICQhyQAWgSAJgGQASgMARgDQAUgEASAKIAEACQAQAKACARQADAXggAgIhTBSQhuBugsA3QhZBsg7CAQg7CAgZCJQgZCJAEDFQACBwAHBkQAGBIgEAjQgFAggPALQgJAIgNAAIgIgBg");
	this.shape_1.setTransform(502.8134,443.0432);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#B08267").s().p("EgEiAhIQAOhEAJgbQAGgVAOgjIAUg3QAjhoAGiYQABiwADhXIACg3IABg4IgChhQADg3AYgiQALgPALADQAIABAHAPQAWAyAPA3QARBFAGBZQADA1ABBsQABBegDA8QgLDIhGCGQhAB6h0BPQAMghAOg+gAufYGQhKgEgugOQg/gVgegsQgQgZgGgjQgFgZgCgoQgDhkAOg+QALgsAbg7QAVguAYgqQg5CfADCKQACBSAjAmQAdAgAxgBQAwgBAcghQAWgZAIgqQADgRAFg7QAIhgAehUQAshrASg1QAhhfgHhGQgJhdhNheIgGgIQAAgeAFg1QAMh9ALg8QAXiCA2hIQAhgsAugfQAkgYAggIQALgDAjgEQAegDAQgGIALgFIAWAOIA2AlQAdARAmAPQAYAIAwAPQATAFAMABQARAAAKgIQAUgRgJgmQgKgsgjgtQgYgegxgsQglghgYgSQgkgaghgMQgPgFgRgEIgFgDQgigYgzgIQghgFg9AAIgrAAQgUgEgigBQhegEh3AFQgrABgZAFIgFABQAsgaBCgEQAUgCBwADIBYAAQA1AAAjAEQAwAGA5ATQAkALBCAaIB3AvQAvASAVAKQAlASAbATQAiAYAqAwQBBgEAfgRQiMhohCg7Qhthig/hiQgUgfgdg4QARADANgJQAPgMAFgfQAEgjgGhIQgHhlgChwQgEjEAZiKQAZiJA7h/QA7iABZhsQAtg4BuhuIBShSQAggfgDgYQgCgRgQgKQAegQAggOQCUhFCTgaQChgcCSAaQCeAcB/BbQCGBgA8CLQAnBZAMB4QAIBSgECIQgGD/gZC9QgRCHgfBRQgYBBguBJQgcAsg9BVIhPBtQABBDgGAiQgIAvgfBLQhJCthvCaQgWAggRARQgZAYgbAJQggAKghgKQgVgGgGgNQgGgMAFgXQAQhIA+hjQBViFAPgeQARgkAXhDQAUg3AHgfQAGghADg6QAIixgTivQgHgFgGgGQgNgQgJgYQgGgQgIgdQgsi2gNiXQgPi0AbiaQAJg7AhgJQAQgFARAJQAQAJAIAQQAMAVADAvIALCwQAGBZAFAwQAIBMANA8QAIAjATBHIACAKIASAnQAWA0AOBQQANBTAGBoIACA1QAxhmAkhuQA+i9ASjFQAJhjABjIQAAhwgGg6QgKhegfhEQgshfhchDQhYhAhsgYQjAgqjoBOQi3A8iEBqQgjAdgnAmQANAXgFAjQgCARgHAWIgNAmQgWBHAHBPQAHBLAmBpIAoBsQAOAhAIAQQAOAbAQASQANANAaATQAeAVAKAKQAaAXAdAxQAlA+AMAQQAKAMAXAaQAWAYAKAOQASAYAPAiQAJAUARArIAGAPQANgEAOAAQAfgBAdAUQAaARATAdQAbArAKA+QAHAqAABIQAAA2gDAiQgEAxgLAmQgTBBg6BXQhRB5hbBXQheBahwA+IhVAsQg2AcgfASQg1AigcASQgUAyg8A1Ig1AuQgfAcgSAWQgoAzgYBQQgJAggXByQgeCXgvB1Qg4CKhUBjQgzA9gxAWQggAOgsADIgdABIgxgBgANptoQgOAHgIAOQgJASABAqIASJSQAAAPAGAGQALAJASgNQAfgUAOgsQALghACgyQADg+gGhSIgMiRQgIhogDheQgBgygagKQgFgDgGAAQgJAAgIAFgAzUHrQgthPgEhvQgDhOAShsQgHBBABBDQAABhAVA7QANAkAaAmQATAcAgAnQArAzAlAoQhlg6gyhWgApExNQACivAih0QAyilCOinIAGgHQgTAfgXApQgrBMgWAsQghBEgTA6QgkBsgLCbQgGBZgEC0IAAADQgUhcACiDg");
	this.shape_2.setTransform(518.9229,475.7991);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	// hair
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#4C331F").s().p("EgAMBCqQgNgCgKgJQgOgOgKggQgbhWgIhwQgEg8ABhvQgLAHgLAEQgNAGgHgFQgIgFACgSIAfmTQADgoAJgRQAGgOANgIQANgJAOABQAVABAOAXQALASAFAcQAZCYgoCUQgHAcgKAXQALAJAHAOQAPAbAIAlQAFAYAHAtQAOBlAEA1QAGBVgLBEQgEAdgNAJQgIAGgJAAIgHgBgEgHBBA0QgIgJgGgUQgihxAXihQAEghAOgNQALgMARAAQASAAALALQANANAFAhQAaCrgpByQgKAagOAEIgHABQgMAAgKgMgEgOBA6iQAHg5AQhFQAJgqAXhUQAFgTAFgKQAIgQAMgGQALgGAPAAQAKABASAEQANAEAIAHQAKAIgDAKQgDAJgPAEQgVAGgDACIgkEsQgJBFgFAiQgKA5gNAtIgcAEQgohuAQiRgEgPtA+TQgOAAgKgXQgahAAEiKQAFiLgag+QgLgbABgNQADgUAYgIQAXgHATAMQAcARAOA3QAMAwAEA+QACAngBBIQgBA7gDAcQgFAxgPAjQgKAZgPAAIgCAAgEACVA8KQgBgpAUhcQAShWgGgwQgCgRACgGQACgGAGgEQAFgDAGACQAGACADAJQAFAOAAAYQAAAkgDAkQgIBsgjBoQgRgDgBgdgEgKmA74QA9jzAsjvQAGggAJgPQAHgMALgGQALgHAMABQABAIgIARQgHAPgDAVIgDAlQgFA8gNBKQgJAvgUBVQgOA9gJAeQgQAxgVAkQgGALgKAFQgFACgEAAQgFAAgEgFgEAD6A7cQAWjSA2jNQAFgTAIgGQAIgGAMACQALACAHAJQAMAMADAbQACAcgDAiQgCAVgHAoQgRBkgSA0QgcBRgyAvgEgGZA6EQAEhPAQhhQALg+AXhxIAwjrQAJgyAKgjQAShGA1iHQADgJAEgCQAFgCAFACQAEACADAFQACAFAAAOIgGBHQgEAjgKBAIAFgEQALgHALAAQATACALAVQAJARACAZQALB7gYByQgZB6g/BgQgEgNgCgiQgFiDAJiEQgVBugPBEQgkCdgwB4QgNAigPAMgEgH7A5eQgEgKABgNQAkloAvliQACgUAKgOQAMgQAPAFQALAFAGAUQALAkACAvQABAdgDA4QgLDGgQBlQgaClg8B3QgJASgLAAIgBAAQgJAAgEgMgEgOGAtIQAAghAJgXQAMgdAZgCQAJB6AEBhQAICxgOBsQgWCchIBpQAnlSAClUgEACFA3JQgFgRADgVQA1lWBFl3QgBgHAJgFIADgBQABgagBgTQgBgZADgKQADgJAHgGQAHgGAJAAQAKABAIAKQACg6gBg5QAAgmAUgGQAIgCAJAEQAIAFAFAIQAGAKABAZQAHB9gEBLQgFBtgbBWQgGASgKAFQgFACgFgBQgPCYgYBvQghCbg6B5QgMAZgPACIgCAAQgOAAgHgSgEgLwAr8QAGhFAShTQAMg5AYhcQAJgkAOgOQANgNAUgDQAUgCAPAKQAQALAIAUQAHASgBAWQgBARgHAWIgNAmQgVA+gMBRQgHAxgIBjQgGBNgLAqQgRBAglAmQg2iBANisgEgRrAmtQAQgpAYgHQADAagHAgQgEATgLAlQg8DHgmDBQgJArgEARQgJAigMAYQADkqBskWgEgCWAtUQgCgdAHgtIBAl5QAEgWAKgOQAMgSAQADQAJABADALQADAJgBAMIgdEOQgJBZgKAuQgQBKggA0QgZgVgEgpgEgErAtkQgKgMgDgTQgPhagDhyQgChFACiKIADiZQABgSADgGQAGgKANgCQANgCAKAGQASAKAKAbQAJAYAEAeQACAUABAkQAFCagCBNQgDCBgVBkQgFAYgMAFIgHACQgJAAgIgLgEAAoAp/QgMgCgEgYQgRiGAojZQAXh1AKg6QAShmAEhLIADhxQABhFAGgsQgigdAFgWQADgLARgRQAXgVAOgGQAZgMAUALQAOAIAHAUQAFANACAXQAIBlADAyQAEBUgEBDQgEBLgQBbQgKA7gXBpQgaBzgSA9QgcBhgjBJQgJAVgMAAIgDgBgEAJLAncQAXiCAJhGQANhvgEhbQAAgQADgFQACgGAGgCQAFgDAFACQAHAEABAQIAEAxQAGB1gSB3QgGAsgKAcQgOAngXAYgEgGkAjIQAKhNAhiSQAThVASgmQAPgfATgJQAMgFAOAFQAOAGACAMIgfAIQgZBSggDUQgeC9gnBlQgPhjAQh9gAHgf2QAcikgDhOIAUgEQAWD7hYDsQgGhUAbidgAFbYRQADg9AGgZQAFgXANgHQAJgEALAEQALAEAGAJQAIAMADAeQAUDAgFBzQgHCqg2B+QgTAsgaAHQADkpANkogAJKOaQABgmgCgVQgDgggIgZIgGgRQgDgKABgIQACgXAcgFQAcgFARARQANAMAGATIAWiWQAXipgCh1QgBggAPgHQANgGAMAMQALAJAGAQQAUA1ADBGQADAygHBMQgJBqgQBKQgWBggpBIQgIAOgJAGQAEB/gIBOQgRCwhJB5gAgCSJQAFgvAQhUQARhbAGgoQAKhIAFhaQACg5AChpQAAghAJgOQAMgSAYgCQAXgBAQAPQANAMAGAWQADAPACAbIAGBkQABA5gCAsQgDAxgKA9QgGAlgPBHQgVBpgRAyQgNAlgVAtIgpBOQgTAlgSANQgGhxAOhsgAOSFAQgTgWgIgjQg4jmgOkqQgHipAFlwIAFm0IgzHQQgTCogXBYQglCLhKBXQguh1gSiVQgNh0ADihQAEj9Aum8IAAAAIgBgBQgHBHgJA/QgwFShrEGQgKAYgOABQgMABgHgMQgHgKgCgPQgYibAFjJQABgzAGhlQgUBYgiBIQgYA1gigBQgeAAgXgtQghg/gMhZQgHg4gChpIgEufIgCjDQgZgTgVgbIgQgVIAABZQAAGegRCrQggFGhxDlQgfhQgNhnQgKhJgEh1QgIjMADk+IADkgQgvgDgdgeQgjgkgJheQgKhkgagkQgZAog0ABQBQFbgXE7QgEAygcAEQgVACgUgfQhRh7gzjGQgxjogdhxQgThOg1isQhGjegphtQhGi1hQiEQgQgZADgQQAEgSAXgGQATgEAXAGQAWAGAWAJQg6hwgkhKQgVgrgKgdQgPgpgBgjQgCgqARgkQASgnAigRQApgVA1AQQAvAPAmAmQAYAYAnA2QAnA2AXAXQAZAZA3AnQA5AoAYAXQA0AxAoBQQAaAyAkBjQAkggAxgLIAIgCQgPhggShXQgIgnABgYQACgjAUgTQASgPAaAAQAZAAAVANQAhAVAbA2QAWAqATA7QAXgWAbgMQASgIASgCQAGgKAHgHQAUgVAXgCQAmgDAoAzQBEBYAkCGIACAGQBLgXBXAeQB6AqAmBtIBHAAQAKgwAbgsQAVATAJArQAHgFAIgCQAPgEAQAEIgCgtQgBggACgRQACgbAKgTQALgXAWgMQAXgNAXAHQAUAHANAXQAJAQAIAdQAeBpAXB3IASAAQBEADA2AkQA3AjAeA9QAfA9gEBBQgEA/glA4QgkA4g5AdQgeAQghAGIAJCpQAQFMAFGgQADD5ABHzQACJugIFTQgEC0gLBnQgRCcgoB5QgPAsgYAIQgGACgHAAQgTAAgRgVgAGE8ZQAIiiAGiiQgMgkgCgoQgCg0AQgwIgQgBQACDNAAEogAG7C8IBQj8QACgGADgDQAFgEADACQAFAHgFAPIhADIQgNAngFALgAIOBMQAViLgIiTQgBgMACgGQACgEAEgCQAEgCAEABQAHCHgMCBQgCATgCALQgEAPgIALg");
	this.shape_3.setTransform(298.4732,426.223);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// flesh
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E4A985").s().p("EgL3BHlQgagBgPgDIgGgCQgQADgTABIg1ABI7igEQgqAAgUgIQghgOgggzQhQh7g0ijQgUg+gRhIQg8gLgmgtQghgmgOg+QgIgngFhLIgeolQgCgsgFgYQgJgmgTgXQgMgPgcgTQgggWgKgJQgigggPg4QgKgmgEhDQggnIABnEQAAg7gDgdQgGgxgRgjQgJgQgTgbQgVgegHgNQgYgrgJg7QgHgqgBhEQgFk4Apl9QAaj8BEm2QBMntAZjEQAwmDAGkyQAChVgNgtQgHgXgQghIgZg3QgbhCgGhXQgEg9AGhhQALjHAhj2QAViZAukhQAfjOBvgUQAEg9gIhYQgKhlgEgxQgOi0AyhqQATgpAigsQAWgcAsgxQApguAagVQAqghApgFQBKgLA9BBQAmApAUA3QBKgxBfhNQADhLAEgYQAKhKAhg3QAnhAA8gTQA7gSBAAeQAgAPAaAYQEdjLFJiHQGEigGcgyQCagTByAGQCQAHByAuQBfAnBdBKIAiAcQAEgpANgeQAYg1AtgFQAzgGAgA5QAaAuAIBEIBMKmQAvGcAVELQAyJ4gLMYIgBA+IAigoQA+hKB6iXQDBjnDjjOQCfiQCJhbQCqhwCngzQBggdB1gPQBfgMB7gEQCBgDBcAJQB4ANBeAlQCCAzB8ByQBdBWBwCRQBZB0A9BgQBKB2AvBuQB7EjgRFdQgQFBiCFBQhwEWjKEoQiXDcj9EtQjPD3hEBaQiTDDhQCsQg7B9hGDlQhQEGgnBhQhVDWiKDDQiFC+iuChQjSDCjJBUQi6BMjKgEQjOgEiwhYQhIgkhDgyIgiB5QhfE5jhJjIhVDlQgxB+grBjQgQAjgMAUQgSAdgWARQgfAYgxAGQgRACgYAAIgwgCg");
	this.shape_4.setTransform(347.5257,458.2936);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-0.4,695.1,917);


(lib.jawgirl = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF66CC").s().p("AuMNkIgDgCQhKglgthGQhRh9ATjCQARiqBShhQBChMBvgoQBVgeBngHIABAAQBMgoBhgdQBVgaCnghQDEgmBhgWQCRghBTgoQBigwCRiDQChiRBLguQAPgJAOgGIABgCQA0hMAohSIAWgrQAOgYAPgPQATgSAYgGQAZgGAVAKQAfAQAFAqQAEAkgPAoQgSAwgrBCIhEBuIgeA3QgRAhgPAVQgOAUgZAbIgqAtQgTAWhxCPQhQBlhBAyQgUAPgTAJQgOAOgZAQQgmAZgdAMIgoAQQgNAGgUAPQgLAygoAcQgSANgeALIg0ASQg4AYhKA+QhCA4iDB1Qh1BlhbA3IhFAnQgqAXgaATQgoAchMBAQhFA1g7ANQgZAGgYAAQg2AAg4gbg");
	this.shape.setTransform(109.6778,140.6075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFC3C3").s().p("EAWbA+ZQkZgmoXh3Qi5gphhgmQiXg7hXhgQgogrgagyQg9gUgwgvQg6g5gkhgQgXg7gah2Qg+kWgyi2QhEj5hPjHQguh1ielWQiEkdg6izQgqh+gWguQgthchCgrQgxgghIgMQgngHhcgGQmdgbl2h0Qq3A3qtB5QoyBjhzAPQmBAykogcQkegai1hsQhjg7hlhoQg9hAhtiHQg6hHgcgoQgshBgXg6QgchFAAhFQAAgbAFgZIgFgTQgYhlAHiJIAVjyQAUjhgKjeQgEhXgKg7QgMhQgbg9QgZg6gxhEIhah2QhyiUhCiPIADACQAaAMAZAHQgQgVgIgbQgMgmAJglQAIglAbgcQAbgdAkgLQAQgFAhgFQAggEAQgFQApgOAxgyIBBhIQAogrAcgZQBKhBB+g4QA1gXBXggQBVghApgXQBDglAkgxQAKgNAaguQAVgmASgTQAogqBFgRQAvgMBSgEQA9gDAiADIAhADQBHg/BIhWQA6hGBniPQCUjNBJhqQB3iuBViTQA6hlAihMQAshjAThaQALg1AMgYQASgoAhgLQAbgIAcAOQAaAMAQAZQAYAlADBIQABAegCAeIAJALQAVAcAEAlQACAcgGAqIgJBFQAbgHAcAQQAaAPAPAaQAOAcADArQAWAIAVARQA5AugDBBQA+gDAyAuQAyAvACA+QAcgDAZAVIAFAEIAVAHQAPADAMgBQAPgCATgOIAegZQAXgPAcgDQAcgDAZALQAWAJAVAUQAOANAWAbQAZAeARAYIMriOQQOi2IZhWQNqiOLChVQJBhGHVghQHighJbgJQFqgGLUABIZPACQC/ABCIgDQh2EwjqIZQg3B/gpBJIAAAEQADCOgqEAQhYIchMK5QgjFFhXOWQhJMNg4HNQhSKphoIoQgpDcgwCAQhGC5h0BuQhxBqjDBBQg2ARkqBJQjTAzkUBiIngCvQkeBojFA4QkJBLjnAaQiUARiiAAQjwAAkQglg");
	this.shape_1.setTransform(641.075,387.5492);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_6
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4D0F20").s().p("As9OEQg7gVgUguQgOghAJgpQAJglAagfQAVgaAkgZQANgKAzghICXhmQBbg+A/ghIBcgsQA4gbAigVQAngYArgkQAdgYAwgrIAmgiQAagpAig+QAig9Aeg6QgzhAg6gnQg9gohjgeQhzgeg4gSQhJgXiJg9QiKg+hHgXQhagdhtgSQAZgOArgbQBEgrBCgkQAlgUAYgLQAkgOAegFQApgGBMALQBSAMAkgDQBOgGA/g2IAUgSIANAIQAUANAoAdQAjAXAeABQAZABAngRQAugTATgDQAngGA4AYIBeAnQAqANA6gCIAMg9QAIgtAEgMQAIghAMgWQAQgbAZgPQAbgRAcAEQAZAEATAUQATATAIAbQAHAZgDAiIAYhFQAKgcAGgMQAKgXAMgOQAQgRAUgHQAXgIATAIQAuATgDBZQgEBqgcB1QAKAPAGARIADAKQANADATAAQAlAAAOAHQAKAFAOAPQAPAQAJAFQAPAJAZAAIArgBQAhABAeARQAeAQASAcQATAbAEAiQADAigLAfQgLAdgcAfQgJAKgqAoQhlBfhqCWQgNATh2C2QAKA9gLAtQgJAmgZAdQgaAfgkAJQgeAHghgJQgegIgbgVIgDgDQgLAGgMAKIgcAWQgbATgiAFQgiAEgfgMQgfgMgWgaQgXgagHghQgcAXglAnIg+BCQhOBPhLANQguAIgrgTIgSgJIgFACQhnA1gzAhQg2AjgPAiQgGANgFAaQgFAcgFAMQgRAqg2AUQgpAPg8ABIgHABQg9AAgsgQg");
	this.shape_2.setTransform(135.4533,93.6529);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-15.4,1263.7,806);


(lib.heart = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhKEWQgOgCgHgMQgIgOAGggQAEgTACgUQAGgqADg0IABgxQABgdADgTQADgZANgIQAFgDAHAAQAHABAFAEQAKAGADAYQAGAsACBaIgBAWIgEAYIgBAcQgBARgLAhQgHAUgJAIQgHAGgLAAIgGgBgADVDmQgIAAgHgHQgHgHgDgJQgEgKAAgaQAChdgDh0QgChYgMgxQgFgTgIgFQgHgGgSAAQiPgEhIAIIg/AHQglAEgbgCQgVgBgLgGQgSgKACgRQABgQATgJQALgEAVgBQAagCAygHQAzgIAZgCQAigDBCAAIBRAAQAmAAARAHQAtASAQBJQAKAqAFBMQAFBggCBTQgBAzgHAZQgEAQgKAKQgKAMgMAAIgDgBg");
	this.shape.setTransform(248.1864,62.4048);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AlpGxQgFgHAGgOQARgqAig2IA8hcQAjg1ASgqQAYg3AFgyQADgdgOgLQgJgHgWABQhUADhUAQQgbAFgPgBQgXgBgMgOQgMgOAAgeQABg/AnhmQAsh1AIguQAIguAWgEQAJgCAJAGQAJAFAEAKQAHAOgCAYQgDA1giBhQgkBkgFAxQA5gMAegFQAxgHAoABQBBACAdAdQAZAZAFAxQAEAvgRA2QgNAqgcA2QgoBOgqA1Qg0BBg9AkQgKAGgHAAQgFAAgEgEgACDGgQgOgDgGgLQgJgPAHgfQAEgUACgTQAGgqACg0IACgxQABgdADgUQADgaAMgHQAGgEAHABQAGAAAFAEQAKAHADAXQAGAtACBaIAAAXIgEAXIgBAdQgCARgLAhQgHAUgIAHQgIAGgKAAIgHAAgAGkFwQgJgBgHgHQgHgGgDgJQgEgKAAgaQAChegCh0QgChYgMgwQgFgTgIgGQgIgFgRAAQiRgEhHAHIhAAIQglADgagBQgUgBgMgHQgRgKABgRQABgQATgIQAMgFAVgBQAYgCAzgHQAygHAagCQAhgDBDAAIBSgBQAlAAARAHQAtATARBJQAJApAFBLQAFBigBBSQgBA0gHAYQgFAQgJALQgLALgMAAIgCAAg");
	this.shape_1.setTransform(227.5423,48.6775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRGxQgFgHAGgOQAQgqAig2IA8hcQAjg1ASgqQAYg3AFgyQADgdgOgLQgJgHgWABQhUADhTAQQgbAFgPgBQgXgBgMgOQgMgOAAgeQABg/AnhmQAsh1AIguQAIguAWgEQAIgCAJAGQAJAFAEAKQAHAOgCAYQgDA1ghBhQgkBkgFAxQA4gMAegFQAxgHAoABQBBACAdAdQAZAZAFAxQAEAvgRA2QgNAqgcA2QgoBOgqA1Qg0BBg9AkQgJAGgHAAQgFAAgEgEgAlZGyIhPgKQg2gGhsgCQhFgCgoAEIgcAEQgRABgMAAQghgBgUgRQgGgGABgFQABgFAIgDQBqgsCIgCQA2gCBFAHIAAgHIAKhgQAPiHgJiHQAAgHgDgCQgCgCgGgBQgsgEhyADQhkACg5gKQgggFgCgSQgBgOAOgIQAIgFASgCQC7gZCGAKQA1AEAQAXQAHAKADAPQABAJABATQABCDgCAxQgDBhgNBDQgFAbgHARIA4AIQAvAHASASQAIAIACALQADALgGAIQgHAJgTACQgRACgTAAQgUAAgXgCgAHbGgQgOgDgGgLQgJgPAHgfQAEgUACgTQAGgqACg0IACgxQABgdADgUQADgaAMgHQAGgEAHABQAGAAAFAEQAKAHADAXQAGAtACBaIAAAXIgEAXIgBAdQgCARgLAhQgHAUgIAHQgIAGgKAAIgHAAgAL8FwQgJgBgHgHQgHgGgDgJQgEgKAAgaQAChegCh0QgChYgMgwQgFgTgIgGQgIgFgRAAQiRgEhHAHIhAAIQglADgbgBQgUgBgMgHQgRgKABgRQABgQATgIQAMgFAVgBQAZgCAzgHQAygHAagCQAhgDBDAAIBSgBQAlAAARAHQAtATARBJQAJApAFBLQAFBigBBSQgBA0gHAYQgFAQgJALQgKALgMAAIgDAAg");
	this.shape_2.setTransform(193.1154,48.6775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},2).wait(126));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(112,5,162.3,87.4);


(lib.head = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ABMDEQAVhEAKgjQAThFADhJQACg9gLguQgIgjgRgOQgVgQgsADQhlAHhbAoQgQAIgJABQgQABgIgKQgFgIACgLQACgJAHgJQASgXApgUQBLglBRgJQBNgKAtAbQAmAWAVAvQAQAkAGA3QAJBYgSBYQgTBYgsBOQgjA+gpARQgFgtAQg8gAi7EhQgJgHACgQQABgOAGgPIAOgcQASggAdhCQAMgaADgNQAEgNADgXIAGgkQADgNAFgFQADgEAFgCQAFgCAEABQAJADAFARQALAqgBAZQgBAXgIAaQgGASgNAdQgMAegOAaQgMAYgKAPQgPAUgRAMQgLAHgJAAQgFAAgFgDg");
	this.shape.setTransform(272.0971,85.2247);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AEgDEQAVhEAKgjQAThFADhJQACg9gLguQgIgjgRgOQgVgQgsADQhmAHhbAoQgQAIgJABQgQABgIgKQgEgIACgLQACgJAGgJQASgXApgUQBLglBSgJQBNgKAtAbQAmAWAVAvQAQAkAGA3QAJBYgSBYQgTBYgsBOQgjA+gpARQgFgtAQg8gAAYEhQgJgHACgQQABgOAGgPIAOgcQASggAdhCQAMgaADgNQAEgNADgXIAGgkQADgNAFgFQADgEAFgCQAFgCAEABQAJADAFARQALAqgBAZQgBAXgIAaQgGASgNAdQgMAegOAaQgMAYgKAPQgPAUgRAMQgLAHgIAAQgGAAgFgDgAjcDiQgCgCAAgEQAAgfALgpIAWhIQAShDADhFQAChJgbglQgQgWgagMQgYgNgdgBQgxgDg5AaQgQAHgHgDQgFgCgDgFQgCgFAAgFQAAgJAGgLQAQgdAhgRQAegQAkgDQAygEAuASQAwASAdAmQArA3ADBaQACA9gQA7QgPA9ggA0QgeAygkAUIgEABIgCAAg");
	this.shape_1.setTransform(250.8612,85.2247);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AIeDxQAWhEAJgjQAUhFADhJQACg9gLguQgIgjgSgOQgUgQgsADQhnAHhbAoQgQAIgJABQgQABgHgKQgGgIADgLQACgJAGgJQASgXAqgUQBLglBSgJQBMgKAtAbQAnAWAVAvQAPAkAGA3QAKBXgTBZQgTBYgrBOQgjA+gqARQgEgtAPg8gAEXFOQgJgHABgQQABgOAHgPIAOgcQARggAdhCQAMgaADgNQAEgNAEgXIAFglQAEgNAEgFQADgEAFgCQAFgCAFABQAIADAFARQALArgBAZQgBAXgIAaQgGASgMAdQgNAegNAaQgMAYgLAPQgOAUgRAMQgMAHgIAAQgGAAgEgDgAqkEyQgCgDgBgHQgIhGAWhRQAPg2AmhaQAkhUAfgsQADgEADgCQgQgqgMgqIgMglQgHgUgHgPIgKgUQgEgMADgJQAEgKAMgEQAMgDALAFQAQAHAPAZQAPAbAXA/QAlBhAjBKIADAGIACgGQAIgRARgcQA+hrAyhvQAIgRAHgGQAGgFAHAAQAIgBAFAFQAJAIgGAXQgrCNhZCFQgPAWgMANQAfA6AhAxIAdArQAQAZAIAUQAKAXgKAKQgJAJgSgFQgWgGgbgdQglgngqhIQgyhXglhcIgDAJQgNAtgKAcIgWA0QgNAfgdBkQgZBSgXAtQgDAGgEABIgDABQgDAAgDgFgAAhEPQgCgCAAgEQAAgfAMgpIAVhIQAThDAChFQAChJgbglQgPgWgbgMQgXgNgcgBQgygDg4AaQgQAHgHgDQgFgCgDgFQgDgFAAgFQAAgJAGgLQAQgdAhgRQAegQAlgDQAxgEAtASQAwASAeAmQArA3ADBaQACA8gQA8QgQA9gfA0QgeAygkAUIgFABIgCAAg");
	this.shape_2.setTransform(225.4408,80.715);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("ANGDxQAVhEAKgjQAThFADhJQACg9gLguQgIgjgRgOQgVgQgsADQhmAHhbAoQgQAIgJABQgQABgIgKQgFgIACgLQACgJAHgJQASgXApgUQBLglBSgJQBNgKAtAbQAmAWAVAvQAQAkAGA3QAJBXgSBZQgTBYgsBOQgjA+gpARQgFgtAQg8gAI+FOQgJgHACgQQABgOAGgPIAOgcQASggAdhCQAMgaADgNQAEgNADgXIAGglQADgNAFgFQADgEAFgCQAFgCAEABQAJADAFARQALArgBAZQgBAXgIAaQgGASgNAdQgMAegOAaQgMAYgKAPQgPAUgRAMQgLAHgJAAQgFAAgFgDgAl9EyQgCgDgBgHQgHhGAWhRQAOg2AnhaQAkhUAegsQADgEADgCQgPgqgNgqIgLglQgHgUgIgPIgKgUQgEgMAEgJQAEgKAMgEQALgDALAFQAQAHAPAZQAQAbAXA/QAkBhAkBKIADAGIACgGQAIgRAQgcQA+hrAyhvQAHgRAIgGQAFgFAIAAQAHgBAFAFQAJAIgGAXQgrCNhXCFQgPAWgMANQAeA6AhAxIAdArQAPAZAJAUQAKAXgLAKQgJAJgQgFQgXgGgbgdQgkgngqhIQgyhXgmhcIgCAJQgNAtgLAcIgWA0QgMAfgeBkQgZBSgXAtQgDAGgDABIgDABQgEAAgDgFgAFJEPQgCgCAAgEQAAgfALgpIAWhIQAShDADhFQAChJgbglQgQgWgagMQgYgNgdgBQgxgDg5AaQgQAHgHgDQgFgCgDgFQgCgFAAgFQAAgJAGgLQAQgdAhgRQAegQAkgDQAygEAuASQAwASAdAmQArA3ADBaQACA8gQA8QgPA9ggA0QgeAygkAUIgEABIgCAAgAonDeQgHgDgNgIIgUgMQgPgHgVgDQgOgBgZAAIi7gCQglAAgVgFQgfgHgRgUQgXgcAHg9QAGg+AghuQAih2AIg4QAEgZANgBQAIgBAGAIQAFAIACAKQAFAkgJAuQgDARgRA/QgbBjgNBpQgCAWAHAKQAGAHALADQAIACANAAIBFAAIgDgJQgDgLACgNIAGgXIAqiWIARg4IANgqQAOgzADgyQAAgPAEgHQADgFAFgDQAFgDAGABQAIADAEAPQAIAbgCAjQgCAagIAkIgOA4IgnCSIgOAwQgKAbgMASIAkAAQBBABAgAEQA3AGAmAVQALhIAliPQAkiOALhLQACgOAEgGQADgFAFgCQAFgCAFABQAJADADAQQAHAfgEAmQgCAbgJApQgMA3gcBsQgXBigHBEQgBALgCAGQgCAJgGAGQgHAIgNABIgEAAQgJAAgKgEg");
	this.shape_3.setTransform(195.8808,80.715);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_3}]},2).to({state:[{t:this.shape_3}]},60).to({state:[]},1).wait(27));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,293.7,115.3);


(lib.but = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Aj/JnQgLgJgFgNQgFgQACgmIANieQARjSARhpIARhYQAaiGAUhMIACgHIgphcIgqheQgZg1gYgmIgPgZQgHgPAAgNQAAgVASgQQAQgQAWgBQAVgCAVAKQATAKAPAQQAOAPAMAVIATAmQBJCXCTEtIAjBFQANhCAZhZQAkh/AQg/IALgsQAFgbACgcQADgwAFgYQAEgTAGgKQALgPAPABQAQAAAKARQAHALADAVQAOBSgDAxQgCAYgJAwQgbCLgWBEQgPAugDAOIgHAoQgEAZgGAQQgOAigeAWIgLAIQBLCdA0B8QAOAgAFAUQAIAegEAYQgEAcgXATQgYAUgagHQgSgFgPgTQgJgMgNgaIjenYIg/iGIgFA9IgqHuQgFA3gGAcQgLAtgXAcQgSAWgSABIgCAAQgMAAgLgJg");
	this.shape.setTransform(205.3667,123.0165);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AGjJ8QgLgJgEgNQgGgQACgmIANieQARjSAShpIAQhYQAaiGAUhMIADgHIgphcIgrheQgZg1gYgmIgOgZQgHgPAAgNQAAgVARgQQARgQAWgBQAVgCAUAKQATAKAQAQQANAPAMAVIAUAmQBICXCVEtIAiBFQAOhCAYhZQAkh/ARg/IAKgsQAGgbACgcQADgwAEgYQAEgTAHgKQALgPAOABQARAAAKARQAGALADAVQAPBSgDAxQgCAYgJAwQgbCLgWBEQgPAugDAOIgHAoQgFAZgGAQQgNAigeAWIgLAIQBKCdA1B8QAOAgAFAUQAIAegEAYQgFAcgXATQgYAUgZgHQgTgFgOgTQgKgMgMgaIjgnYIg/iGIgFA9IgpHuQgFA3gHAcQgLAtgWAcQgSAWgTABIgBAAQgNAAgLgJgAuSJMQglgEgRgMQgNgIgGgOQgHgOAEgOQAHgXAjgMQAYgHAjgDIA8gCQAlgCA1gJIBagQQBXgOCVgHIBcgEIAAgEQAAiQAak6QAZkrgDihQhfgOitAkQi7AmhTgEQgtgCgYgRQgQgMgGgSQgHgTAIgQQAJgSAZgHQANgEAhgEQAcgDAlgIIBAgRQCsgrDEgMQA1gEAjAHQAvAJAaAeQASAVAIAiQAFAYABAnQAFCZgYEQQgbEpAAB+QAAAegCASIABAAQBlgLAQAAQBCgEAxAMQAmAJBCAfQA+AcABAkQABAYgYARQgWAPgbgBQgUgBgdgLQgfgMgQgFQgvgPhCAEIh0ANQhBAHh8ACQiCACg7AFIi0AYQhDAJg3AAQgfAAgbgDg");
	this.shape_1.setTransform(137.8054,120.9179);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AyzNDQgLgDgGgJQgJgMAFgYQAJgvAhg3QALgSA0hLQBciFBjjaQA4h4AShQQAahygdhbQhMgLiDAvQiPA1hBgBQg+gBgYgiQgLgQgCgXQgBgPACgbIARinIAtmqQADgUAGgNQAJgRAPAAQAZgBALArQAeB1gRCzIgQCWQgLBcgCA6QA5gGBvgqQBsgpA7gFQBagHAzAsQAvApAMBbQAPBsgiB+QgZBfg9CCQhFCVhEBpQhUCChiBZQgWAUgPAEQgGACgGAAIgKgBgAMfL2QgLgJgEgNQgGgQACgmIANieQARjSAShpIAQhZQAaiFAUhMIADgHIgphcIgrheQgZg1gYgmIgOgZQgHgPAAgNQAAgVARgQQARgQAWgBQAVgCAUAKQATAKAQAQQANAPAMAVIAUAmQBICXCVEsIAiBGQAOhDAYhYQAkh/ARg/IAKgsQAGgbACgcQADgwAEgYQAEgTAHgKQALgPAOABQARAAAKARQAGALADAVQAPBSgDAxQgCAYgJAwQgbCLgWBDQgPAugDAOIgHApQgFAZgGAQQgNAigeAWIgLAIQBKCeA1B7QAOAgAFAUQAIAegEAYQgFAcgXATQgYAUgZgHQgTgFgOgTQgKgMgMgaIjgnYIg/iHIgFA9IgpHvQgFA3gHAcQgLAtgWAcQgSAWgTABIgBAAQgNAAgLgJgAoWLGQglgEgRgMQgNgIgGgOQgHgOAEgOQAHgXAjgMQAYgHAjgDIA8gCQAlgCA1gJIBagQQBXgOCVgHIBbgEIAAgEQAAiQAak7QAZkqgDihQhfgOisAkQi7AmhTgEQgtgCgYgRQgQgMgGgSQgHgTAIgQQAJgSAZgHQANgEAhgEQAcgDAlgIIBAgRQCsgrDDgMQA1gEAjAHQAvAJAaAeQASAVAIAiQAFAYABAnQAFCZgYEPQgbEqAAB+QAAAegCASIABAAQBlgLAQAAQBDgEAxAMQAmAJBCAfQA+AcABAkQABAYgYARQgWAPgbgBQgUgBgdgLQgfgMgQgFQgvgPhDAEIh0ANQhBAHh8ACQiBACg7AFIi0AYQhDAJg3AAQgfAAgbgDg");
	this.shape_2.setTransform(99.8135,108.7065);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_2}]},62).to({state:[]},1).wait(20));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37.4,0,274.5,192.3);


(lib.big = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ai4G7IgBAAQgLAFgLgBQgPgCgLgMQgKgLgCgPQgBgIABgMIADgTQADgVgBgfQgBh6AIhuQACggAGgTQgFgaABgNQABgYAOgOQAKgJAZgHIBYgYQArgMAYgIIALgFQg4hogfhYIgDABQghAJgrADQgXABg1ABQgaAAgNgCQgWgDgPgIQgLgHgHgJQgHgFgFgHQgKgOAFgOQADgKAKgGQALgPAYgDQAKgCAOAAIAPABIAVgJIAsgUQA0gXA6gEQAjgCARALQAJAGAGAKQAPAHAOAPQALANAVAmQAkBDCFDNQBtCmAwBvQALAaAFARQAFAYgEAUQgEAXgTAPQgTAQgVgFQgIgCgGgFQgJAJgPAFQgZAIgSgOQgNgKgIgVIgLglQgLgkgeg4Ihsi7QgdAXgiAOQgnAPgoABIgUABIgJACIABAFQANA+ADBWQACAxAABkQABAlgFASQgKAggYAJQgIADgHAAQgLAAgKgFg");
	this.shape.setTransform(335.5394,7.7965);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AjXHyQgcgFgNggQgIgSgDgmIgWkXQgOiJgfiAQgThTgDgPIgDgSIgNACQglAHhLgCQhugDhlACQgbAAgNgEQgYgIgGgSQgCgIABgIQgUgMgJgUQgEgJAEgFQADgDAJAAQAEAAAXgIQARgGA2gJQApgHBSgVQA9gNB8gMIC5gSQATgCALABQAQABALAGQAMAGAHALQAHAMAAANIAAAKQAJAIAEANQAEAQgGAOQgHASgWALQgPAIgbAGIgmAIIAFAgIAzEvQAYCvgNCDQgDAbgGAMQgGANgKAHIADAYQAAASgHAMQgHAMgNAGQgJAFgJAAIgIgBgADzGIIAAAAQgLAFgMgBQgOgCgLgMQgLgLgCgPQgBgIACgMIADgTQADgVgBgfQgBh6AIhuQACggAGgSQgGgaABgOQABgYAOgOQAKgJAZgHIBZgYQArgMAXgIIAMgFQg4hogfhXIgEAAQghAJgqADQgXABg2ABQgZAAgOgCQgVgDgQgIQgKgGgHgJQgHgGgFgHQgKgOAEgOQAEgJAJgGQAMgPAXgEQAKgCAOAAIAPABIAWgJIArgUQA1gXA6gEQAjgCAQALQAJAGAHALQAPAGANAPQAMANAVAmQAlBDCFDNQBtCmAwBvQALAaAEARQAGAYgEAUQgFAXgSAPQgUAQgUgFQgIgCgHgFQgIAJgPAFQgZAIgTgOQgNgKgIgVIgLglQgKgkgfg4Ihri6QgdAXgkAOQgmAPgpABIgTABIgJACIAAAEQANA+ADBWQACAxAABkQABAlgFASQgKAggYAJQgHADgHAAQgLAAgLgFg");
	this.shape_1.setTransform(292.6592,12.872);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AtiIcQgOgCgKgLQgKgKgEgPQgKgCgJgGQgPgLgFgZQgEgQABgcQAJjXgRjQIgMicQgHhbAChCQABgjAKgQQAGgMANgFQAMgGAMAEQAMAFAIAPIACgFQAHgNAQgEQAPgEANAHQATAKAKAlQAWBOAJBlQAFA8ADB5QADCYgDBNQgFB+gWBjQgIAhgLAPQgIALgMAGQgKAGgJAAIgFgBgAgoHIQgcgFgNggQgIgSgDgmIgWkXQgOiJgfiAQgThTgDgPIgDgSIgNACQglAHhLgCQhugDhlACQgbAAgNgEQgYgIgGgSQgCgIABgIQgUgMgJgUQgEgJAEgFQADgDAJAAQAEAAAXgIQARgGA2gJQApgHBSgVQA9gNB8gMIC5gSQASgCALABQAQABALAGQAMAGAHALQAHAMAAANIAAAKQAJAIAEANQAEAQgGAOQgHASgWALQgPAIgbAGIgmAIIAGAgIAyEvQAYCvgNCDQgDAbgGAMQgGANgKAHIADAYQAAASgHAMQgGAMgNAGQgJAEgJAAIgIAAgAGiFeIAAAAQgLAFgMgBQgOgCgLgMQgLgLgCgPQgBgIACgMIADgTQADgVgBgfQgBh6AIhtQACggAGgTQgGgaABgOQABgYAOgOQAKgJAZgHIBZgYQArgMAXgIIAMgFQg4hogfhYIgEABQghAJgqADQgXABg2ABQgZAAgOgCQgVgDgQgIQgKgGgIgKQgGgFgFgHQgKgOAEgOQADgKAKgGQALgPAYgDQAKgCAOAAIAPABIAWgJIArgUQA1gXA6gEQAjgCAQALQAJAGAGAKQAQAHANAPQAMANAVAmQAlBDCFDNQBtCnAwBuQALAaAEARQAGAYgEAUQgFAXgSAPQgUAQgUgFQgIgCgHgFQgIAJgPAFQgZAIgTgOQgNgKgIgVIgLglQgKgkgfg4Ihsi7QgdAYgjAOQgmAPgpABIgTABIgKACIABAFQANA9ADBWQACAxAABkQABAlgFASQgKAggYAJQgHADgIAAQgKAAgLgFg");
	this.shape_2.setTransform(275.1857,17.0824);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AndKXQgNgCgLgLQgKgKgDgPQgLgBgIgHQgQgLgFgZQgDgQABgcQAIjXgQjRIgNibQgGhbAChCQABgjAJgQQAHgMAMgFQANgGAMAEQAMAFAHAQIADgGQAHgNAPgEQAQgEANAHQATAKAKAlQAVBOAJBlQAFA7ADB6QAECYgDBNQgFB+gXBjQgIAhgKAPQgJALgLAGQgKAGgJAAIgGgBgAFcJDQgbgFgOggQgHgSgDgmIgXkXQgOiKgeh/QgUhTgCgPIgDgSIgNACQglAHhLgCQhtgDhlACQgcAAgNgEQgXgIgGgSQgDgIACgIQgUgMgJgUQgEgJAEgFQACgDAJAAQAFAAAWgIQARgGA3gJQApgHBRgVQA9gNB8gMIC5gSQASgCALABQAQABAMAGQALAGAHALQAHAMABANIgBAKQAKAJADAMQAEAQgFAOQgIASgWALQgPAIgbAGIgmAIIAGAgIAzEvQAXCvgMCDQgDAbgGAMQgGAOgLAGIADAYQABASgIAMQgGAMgOAGQgJAFgJAAIgIgBgAzdIzQgRgCgKgLIgFgHQgMAOgOADQgZAGgSgXQgSgXAEgaQADgXASgXQALgPAYgYQCNiJBnh3QB7iPBYiKQitgeisAHQgZABgNgCQgVgEgLgMQgMgPABgZIAEgXQgbgGgNgTQgMgSABgrIAGklQABglAPgLQAMgIAQAFQAQAFAIAOIAFAJQAEgEAGgEQALgJANACQAgAFAHA5QAIBJACBcIAABeQCPgHCPARQAiADAVAGQAdAIAUAPQAWARAOAbQANAaADAeIAAAFIACAFQAEARgHAUQgDAegLAlQgvCXiKCmQgtA2hPBTQhjBogcAfQgcAggSAIQgMAGgMAAIgGgBgAMoHZIAAAAQgMAFgLgBQgPgCgLgMQgKgLgCgPQgBgIABgMIADgTQADgVgBgfQgBh6AIhuQACggAHgTQgGgaABgOQABgXAOgOQAKgJAZgHIBYgYQArgMAYgIIALgFQg3hogghXIgDAAQghAJgrADQgXABg1ABQgaAAgNgCQgWgDgPgIQgLgGgHgJQgHgGgFgHQgKgOAFgOQADgJAKgGQALgPAYgEQAKgCAOAAIAPABIAVgJIAsgUQA0gXA6gEQAjgCARALQAJAGAGALQAPAGAOAPQAMANAVAmQAkBDCFDNQBtCmAwBvQALAaAFARQAFAYgEAUQgEAXgTAPQgTAQgVgFQgHgCgHgFQgJAJgPAFQgZAIgSgOQgNgKgIgVIgLglQgLgkgeg4Ihsi7QgdAXgjAOQgnAPgoABIgUABIgJACIABAFQANA+ADBWQACAxAABkQABAlgFASQgKAggYAJQgIADgHAAQgKAAgLgFg");
	this.shape_3.setTransform(236.2229,4.7642);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_3}]},2).wait(113));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(100.1,-61.6,272.29999999999995,132.8);


(lib.sky3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#544944").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape.setTransform(821.6,476);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#736964").s().p("EiAXBKYMAAAiUvMEAvAAAMAAACUvg");
	this.shape_1.setTransform(821.6,476);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[]},1).wait(53));
	this.timeline.addTween(cjs.Tween.get(this.shape).wait(56).to({_off:true},1).wait(54));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1643.2,952);


(lib.eyeflare = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ABuCPQgRgPABgYQABgNAHgLQAHgLALgGQAMgGANAAQANABALAGQASAKAFAVQAFAVgMASQgMATgXADIgHABQgTAAgOgOgADGAbQgIgBgFgFQgGgFgCgIQgBgIADgGQADgHAGgEQAHgEAHAAQAJAAAHAHQAIAGAAAIQABAIgEAHQgDAGgHAEQgGADgFAAIgEgBgAi5AZQgIgBgFgFQgGgFgCgIQgBgHADgHQADgHAGgEQAHgEAHAAQAJAAAHAHQAIAGAAAJQABAHgEAHQgDAGgHAEQgGADgGAAIgDgBgAjRhGQgRgQABgXQABgNAHgLQAHgLALgGQAMgGANAAQANABALAGQASAKAFAWQAFAUgMASQgNATgWADIgHABQgUAAgNgOg");
	this.shape.setTransform(22.6322,15.6718);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("ABECfQgRgPABgYQABgNAHgLQAHgMAMgGQALgGANABQAOAAALAHQASAKAFAVQAFAVgMARQgMAUgYADIgHAAQgTAAgOgNgADDBJQgIgCgGgFQgFgFgCgHQgCgIADgHQADgHAHgEQAGgFAIABQAJAAAHAGQAHAHABAJQABAHgEAHQgEAHgHADQgFADgGAAIgDAAgAjIAQQgIgCgGgFQgFgFgCgGQgCgIADgHQADgHAHgEQAGgFAIABQAJAAAHAGQAHAHABAJQABAHgEAGQgEAHgHADQgFADgGAAIgDAAgAjIhVQgRgQABgXQABgNAHgLQAHgMAMgGQALgGANABQAOAAALAHQASAKAFAVQAFAVgMARQgNAUgXADIgGAAQgUAAgOgNg");
	this.shape_1.setTransform(22.985,14.1218);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},4).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.1,45.3,34.5);


(lib.suns = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#ECFFFF").s().p("AwRbgQh0gshXhVQhohmguiRQgtiRAbiPQAciQBgh2QBfh2CHg4QCHg4CXAPQCXAPB5BRQBsBIBFByQBFByAOCBQANB4glB3QglB3hPBcQhPBbhwA3QhwA2h5AFIgaABQhsAAhngogAMvSRQhug7g4hoQgcgygMg3QgLguAAguIABgVQAFh2BJhmQBJhlBugrQBGgcBLAAQArAAAsAJQB6AYBVBTQBVBTAcB5QALAxAAAxQAABFgYBCQgoBvhjBMQhjBLh3AJIgeABQhmAAhfg0gAj3iQQjHgFi1hkQi2hjhtinQgyhKghhYQg8idAGiqQAIi7BbirQBbiqCYhvQCYhtC+giQC/ghC0AzQC+A3CWCOQCWCPBBC8QBBC9gfDLQggDNh2ChQh2Cgi5BcQiuBWi9AAIgUAAg");
	this.shape.setTransform(142.332,179.982);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.suns, new cjs.Rectangle(0,0,284.7,360), null);


(lib.moon = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ah5IxQhtgihahJQhahKg3hjQggg6gTg/QgsiYAliXQApitCLh+QB5huCWghQgUAdgRAfQhBB7gECGQgFCIA5B/QA5B/BoBXQBoBWCJAhQCGAgCDgcQgOATgPATQhwCIixA1QhaAbhYAAQhUAAhSgZg");
	this.shape.setTransform(54.0725,58.6315);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,108.2,117.3);


(lib.groundtomove = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6A3439").s().p("EiYhAjpMAAAhHRMExDAAAMAAABHRg");
	this.shape.setTransform(976.225,228.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1952.5,456.2);


(lib.glow = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6F96AB").s().p("EgkBAkCQpQpQjhroQiKnJAAoBQAA1GO7u7QO7u7VGAAQVHAAO7O7QCjCiCGCuQKSNRAARgQAAVHu7O7Qu7O71HAAQ1GAAu7u7g");
	this.shape.setTransform(326.1,326.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.glow, new cjs.Rectangle(0,0,652.2,652.2), null);


(lib.girlfromback = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// hair
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3A16A").s().p("AAEHAQgRgBgTgMQgNgIgTgTQgSgSgIgMQgMgSgBgRQgGAbgTAUQgUAUgZABQggABghgdQgcgZgKgbQgLgcAEgvIAFhFQgOgBgMgKQgMgLgIgSQgag7AQhaQAEgWAOg1QAMgvAEgcIAFglQAEgUAFgPQAIgSAMgNQAOgPARgDIANgCQAHgCAFgDQAIgEAFgKQADgGADgOQAKgoAKgQQASgfAbgHQAJgDAWAAQAUgBAKgDQAMgFAWgPQAfgQAfAMIAaAOQAQAIALAAQAKABAMgGIAVgJQAmgQAnABQApABAVAUQAQAPAEAcQADASgBAgIgBAUIABAEQAGAXgBAmIAABKQAAAUAEAKQADAFAFAGIAJAKQAQAUAFAtQANBsgNByQgGAvgKAZIgLAXQgHAPgDAJQgHARgIAnQgJAhgSAPQgHAGgMAHIgVAKIgUAMQgLAHgJAEQgfALgfgQQgfgRgJgfQgGAbgSATQgUAVgZAAIgBAAg");
	this.shape.setTransform(26.8898,37.2498);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// front_arm
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFC3C3").s().p("ABEG5QgigagSgLIgqgXQgagOgMgQQgNgSgEgbQgCgPAAgjQABhBgIhQQgEgwgMheIgMhJQgGgegehbQgOgpgHggIAAgNIABhAQABgkAFgbQABgLADgIQAegDARAIQAWALANAeQAGAOAKApQAHAcAPAqIAYBFQAfBhAPB/QAIBIAJCgQABAUAFAIQAFAJAPAJIAzAiQAiAXALAQQAJAOACAQQACARgGAPQgGAPgNAKQgNALgQACIgHABQgXAAgagSg");
	this.shape_1.setTransform(65.275,124.9618);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// dress
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CC3399").s().p("Aj8GuQgWgFgOgUQgOgUADgWIACgMQAAgIgBgEQgCgGgGgFIgLgKQgWgWARg4QAJgaAIgOQAMgVARgJQAUgHAIgGQAJgFAJgQQARgbADgfQgLgqgUgtQgTgqgjg/QgWgngGgSQgKgkAKg0QAOg8AEgdIAGgfQAEgRAHgLQAJgLANgHQANgHAOABQAPABAMAHQANAIAHAMQAMAUgDAkIgCARIAAAAQARAEANAOQAPgJAGgYQAGgcAFgNQAIgWAVgMQAWgNAVAIQAhANAFA1QABANABAbQABAXAGAQQAEAJAGANIANAVQAPAZAJAkQAGAWAHArIAbCsIASgOIAUgRQANgKAJgFQAcgPAXAFQASAFAUAaIADADQAQAWAEARQAEAQgEAiQgCARgDANQAVADALADQAUAHAMALQAKAKAEAPQAEAOgDAOQgEAOgJALQgHAHgIAFIgJAEIgUAFQgMADgHAEQgFAEgIAJIgMAOQgJAIgOADQgJACgSACQglADhlAOQgKAcgfAMQgfALgagQQgJATgSALQgTAMgVAAQgVAAgSgMIgIgFIgDACQghAXgcAAQgIAAgIgCg");
	this.shape_2.setTransform(50.164,116.6672);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// body
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFC3C3").s().p("AB0NEQgPgEgWgMQgagOgLgEQgegHgMgHQgXgNgMgfQgHgVgFgmIgLhNQg7AthegEQg4gCgcgYQgfgbgGg0QgCgSACgaIADgsQAEg0gIgqQgHgpgXgvIgIgQIgFAwQgDAhgCBxQgBA4gFAhQgDAZgHAaQgJAigQARQgPAPgmAOIgmAPQgVAIgLACQgTAFgPgDQgVgEgNgSQgOgSADgUQAEgiA1gaQAUgKAbgKQAMgEAEgFQAEgGACgLQAHgtALh0IAGg7QAGhIAKgiIAKgfQAFgSABgOIABgNIgCgFQgHgbAFgiQADgWALgoQAKgiAIgRQAOgcAVgNQARgLAngGIASgDIAChSIACgXQg6gIgkgZQgSgMgcgcQgkgkgQgTQgegkgSgkQgdg/AIhLQAIhIAog8QARgZAtgxQAWgYAMgLQAUgSAUgJQAegOA7gCQBOgDAtAPQAmAMAvAiQAtAhAaAgQAWAbAbAxQAaAwAEAcQACAQgBAXIgCAmIAAAnQABAXgDAPQgIAogkAmQgXAYgwAiQgyAjgbALQgkAOg0ACQACAOABAVIABBLQALAGAMALQAPABANAKQAQAMAYAgQAHAHAUARQARAOAIAKQAVAZAFAoQADAdgDAsQgDAqgLAaIAHAXIAeBqQAFgIAFgMQAHgRAGgGIADgEIgDAWIgHAIIAAAcQAWAgArAAQgFAHgFAGQAJAJAHAJIANgRIAJgLQgEAPgBASIgBAkQANAeALAiQgVATgOALQgUAPgTAHQAKA3AFAzQAQgCAVAJIAjAQQALAFAVAGQATAHAJAKQANAOAAAUQAAAVgMAPQgLAOgTAGQgLADgLAAQgIAAgIgBgACZIRQgWgagagWQgCgPAAgPQgBgPAGgNIABgBQAdgVAUgKIAdgLQATgHAJgGQAKgFAMgMIAVgSQARgLAngUQAMgGAWgSQAVgQAOgIIAvgWQALgGAHgGIAEgHIAFgGIAAgBIAAAAIAMgOQAIgJASgJQAJgFABgEIABgIIAAgmQgBgaAFgPQAHgcAYgMQAMgGAOAAQAOAAALAGQAQAKAIATQAGAOACAYQACATAAA0IgBAfQgDAUgGARIAEAEIgJAHIgCAEQgOAagZALQgOAGgZACIhIApQhHApgaAUIgVAQQgNAJgLAFQgIAFgQAGIgXAJQgaAMgkAaIg2AkgAAhFjIAAgkIALgKIAEgaIAHgHIAMgLQAIgIALgVQANgWAogjQAQgQACgOQABgJgJgaQgHgTgEgoQgFghAJgPQAJgPATgGQAUgGARAJQATAIAPAgQAYAyAKA1QAIAmgGAXQgHAbgYAaIgXAYQgPAPgHALIgcAqQgSAXgUAGQgEAQgIANQg7AAgfgpg");
	this.shape_3.setTransform(62.5985,83.7342);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.2,-7.5,132.4,178.4);


(lib.johnnymouthtalk = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF6699").s().p("AgCAqQgYgCglgKQgYgHgNgHQgUgKgJgOQgIgMgBgVIALgBQAZgBAwACQA8ACAdAEQAyAGAmAPIAQAHQgPAegQAKQgPAJghABIgbAAQgZAAgKgBg");
	this.shape.setTransform(24.525,23.5845);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhQC8IgfgMQgbgGgOgFQgZgJgggcQgqglgMghQgJgWAAguIABhfQAAgbAEgNQAEgOAKgLIAHgHQAOgNAVgCQATgDAkAJIAtALQA7APAbASIAQAMQAJAGAIADQAJACAdAAQALAAA0AHQAnAEAXgGIARgFQALgDAGABQAKABANAIQAUAKAIAHQAOANACAVQACAUgJARIgSAYQgHAKgKAWQgnBVgrAqQgbAagbAHQgMADgSgBIgdgCIg5ACIgJAAQgeAAgTgGgAiaAAIgLAAQABAUAIANQAJAPATAKQAOAGAYAHQAlAKAYADQARACAtgBQAhgBAOgJQARgKAPggIgQgGQgmgPgygGQgdgEg9gCIgvgBIgZABg");
	this.shape_1.setTransform(27.25,19.4438);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("ABEBhQg6gDgTgDQg0gJgbgEIgcgDQgRgCgLgDQgYgHgbgRQgQgKgegYQgYgRgIgMQgQgUAEgWQACgNALgLQAKgKAOgEQAZgHAeAMQANAFAkAWQAVALAMAEQAJADAMABIAVACQAQABAcAGQAeAGAMACQAaAEA0ABIBlACQAsABASALQANAHAIANQAIANAAAPQABAQgIAOQgHANgNAIQgSAMgnAAQgeAAhpgEg");
	this.shape_2.setTransform(27.4943,10.0461);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2}]},4).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.2,0,57.400000000000006,38.9);


(lib.johnnymouthclosed = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ABEBhQg6gDgTgDQg0gJgbgEIgcgDQgRgCgLgDQgYgHgbgRQgQgKgegYQgYgRgIgMQgQgUAEgWQACgNALgLQAKgKAOgEQAZgHAeAMQANAFAkAWQAVALAMAEQAJADAMABIAVACQAQABAcAGQAeAGAMACQAaAEA0ABIBlACQAsABASALQANAHAIANQAIANAAAPQABAQgIAOQgHANgNAIQgSAMgnAAQgeAAhpgEg");
	this.shape.setTransform(27.4943,10.0461);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.2,0,57.400000000000006,20.1);


(lib.johnnyfromback = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// front_hand
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E4A985").s().p("AAlEgQhfgagZg+IgCgJQgIgMgCgQQgCgMABgXIAAgRQgLiIgViVQgHgugBgTQgCgdABgZIAGACQAcAHA1AGIAZACIABADQAEAeAFBAIAEA2QAMCbAFBjIAAAYQANAXAtAIIAiAHQASAGAKALQAOAPgCAXQgCAXgRANQgPAMgaAAQgSAAgXgGg");
	this.shape.setTransform(83.3555,61.825);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// shirt
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6633FF").s().p("AgOFLIgogOQgZgKgOgEIgdgFIgegGQgjgJgPgTQgSgWAFgdQACgJAEgIQgEgbAUgkQAMgWAagjIARgXIAKgqIgDAAIghAAQgUAAgOgDQgSgDgNgJQgPgKgGgPQgDgKAAgUQAAgTACgOQACgPAGgWIALgmQAHgYAPgfQAKgXALgLQAMgLAegIQAPgEAMgDIAQgJQAVgMAdgJIA1gQQAggIAOgBQAbgBAYANIAEACIAKAAQAXABAOAPQAGAHAIAQQAdA4AKAQIAgArQARAaAEAWQACARgEAOQgKAcgqANIgiAGIgLACIAFArQAKBLgMBGQgMBMgkA8QgUAhgWAMQgSAKgWAAQgTAAgWgHg");
	this.shape_1.setTransform(88.7696,33.1372);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// pants
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0033CC").s().p("AgwElIhEgfQgqgTgagJIgogOQgXgJgPgJQgKgHgUgQQgUgQgLgHIgOgIQgIgFgEgFQgRgUAPgvIAWhHQALglAQgOQANgMAUgCQAUgCARAJQAMAGAVARQAPAKAcAJIBMAZIgMgZIgOghQgKgUgDgIQgHgVAEgpQAHhDARgzQAPgpAWgPQASgMAZACQAWACATANQAeAUAcAwQAbAvATAvQAPAlAIAZIAOAuIARAwQAIAdgFAVIgCAHIATACQAtAFAnAaQAmAZAWAnQAVAmgJAcQgHAWgaAOQgRAKggAIIhXAXQg9AQggABIgJAAQg8AAhKgfg");
	this.shape_2.setTransform(58.1964,44.887);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// hair
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#4C331F").s().p("ACrEOQgKAAgHgFIgGACQgMAEgLgFQgIgEgJgKIgQgQQgGgEgEgCQgSgJgSAGQgHADgEAEIgKAJQgMAKgNgDQgOgEgHgNQgGgRANgeQgGgDgEgHQgDgHAAgHQABgJAIgTIAGgNQgEgFgDgHQgFAAgDgIQgFgLADgWQgPAAgJgDQgSgGgFgPQgCgIACgLIADgKIgFADQgRAGgOgKQgQgLABgRQAAgNALgOIAGgHIgFAAQgXgCgRgPQgFgFgEgFIgFADQgKAJgOAFQgTAHgQgGQgIgDgHgHQgGgHgCgIQgDgPAOgUQAKgQANgJIACgKQAFgPANgJQASgLAmACQACgMAHgHIAGgFQgDgHAAgFQgBgTARgMQAQgLASAHQAFACAFADQACgDAEgBQAHgEAPAAIATgGQALgCAIAFQAFADACAAQACAAAGgFQAHgFAIAAQAJAAAHAFQAGAFADAAQACAAAHgDQAIgEAJADQAIACAFAHQAFAHACAOIACAPIACAAQASABAIAQIABAEQAGABAFgCQAEgDAHgHQAHgGAKABQAKAAAHAHQAGAGACAJQACAKgEAJIgLAPIADABQAkARAHAeQACANgEANQgEAIgGAGQAIAMADAYQACATgBAKIgDAMQAMAHAHAMQAJAQgIARQgMAQgBAJQgBAEABAHIABAIIABAGQAAAEgCADQgCALgFASIgBABQACANgBAFQgCANgIAGIgHAEIACAWQABAlgPAPQgJAIgOAAIgDAAg");
	this.shape_3.setTransform(85.436,-34.9202);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// beard
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#4C331F").s().p("AgIBoQgJgDgGgGQgIgHgBgJQgBgIAEgLQAFgRAKgDQAJgDAOAMQAEgYgCgUQgBgHgEgCQgCgCgHAAQgOABgLgLQgHAKgJAFIgIADIgIAJQgHAFgIgDQgHgDgFgNQgFgNgEgWIAEgDQADAIAEABQADAAAJgFIAKgGIAKgKQAIgIANgBQANgBAKAHIAKAIQAFADALAAQAMgBAFADQgBgKAGgJIAEgJIACgKQACgJAGgHQAGgHAJgCQAJgCAIAFQAJAEACAJQACAGgCAFQgCAFgFACQgJACgBACIAAAGQABAFgCAIIgEANQgBAEAAAPIACAeQADAVgBAHQgBAIgFAFQgFAGgGABQADAOAAAIQgBANgIAGQgHAGgTAAQgaAAgKgEg");
	this.shape_4.setTransform(75.7821,-15.7286);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// body
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E4A985").s().p("AhGJwQgUgIgQgOQiahEhqhBQiHhUhbhjIgDgDQgdgFgQgTQgKgLgFgSQgEgKgEgXIgDgYIAAgbIABgpQAAgTACgQIAEgbQABgVABgFQADgLAIgJQAIgJAKgEQAYgJAVAOQALAHAMATQAIANADAMQABAIABATIAFAXQADANgBAUIAAAYQAUADAUAKQAKAFALAJIAGg2QABgMAEgIQAEgJAIgFQAIgFAKgBQAJAAAIAFQAJAFAEAIQAFAIACARIAGAzIABALQAYgUAggUIBZg5IAegWQASgMAOgGQASgIASAAQAMgBALAEIAQgBQA0AAAXAbQAHAJAGAQIAKAbQAFALAJAPIAPAZIAHAPIAEgYQAUhyAhhAQAXguAcgTQAMgIAVgGIgBglQAAgPABgLIgMgBQgkgGgegSQg8glgbhHQgYg8AEhPQAFhaAqg0QAmgtA5gLQAagFA2ADQAmADAYAFQAhAIAXAPQAZAQAXAgQAZAfAIAYQAKAegCA5QgBAugKAWQgDAIgIAMIgNATQgMAbgHANQgSAhg3AjIABACQAFAKACAOIAEASIABAYIAAAUIAJAFQAMgHAPADQAOACALAKQAPANAQAhQA3BwAVA7QAZBBAiCHIAhCCQAJAEArAKQAgAHAOAPQAPAPABAXQAAAYgOAPQgVAXgogBQgOAAgTgDIghgHIgggGQgTgFgKgJQgMgKgIgSQgEgLgFgXIgch5Igch0IgLgpQgKA4gVBTQgNA1gKAaQgPArgWAdQgpA4hNAfQg5AXhXAJQgTACgQAAQgfAAgUgHgAk7EkIgIAHIA+ArQA1AiBPAjQALgMATgLIgSg9QgRgxgXgrIgtAQIg3AUQgZAKgRABIgEAAIgMAKg");
	this.shape_5.setTransform(66.7133,11.3466);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-61.9,133.4,153.1);


(lib.johnnyeyes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AGpCVQgQgQgHgcQgEgTAAgiQAAgfACgQQADgZALgRQgRgBhSAOQg8AKgigRQgLgGgHgJQgIgKACgLQADgOAUgLQAjgUAygJQAfgFA7gCIBugFQAygCAYALQAmASAQAyQAKAeABA6QAAAegCAQQgEAZgMAQQgNAPgWALQgPAGgcAIQgoAKgZAAQglgBgVgTgAjKBvIghgCIgaABQgPAAgKgEQgPgHgOgUQgRgWgMgbQgSgogDgxIgaAAQgQgBgJADQgHACgPAJQghATgZAGIgeAGQgSAEgLAFIgQAJQgLAHgGADQgTAIgRgIQgIgEgFgIQgGgHAAgJQAAgNAOgRQAYgeAlgTQAIgEAigOQAagKAPgLIAQgNIASgLQAQgHAjgBICOgCQAQgBALADQAQAEAWAaIAkAqQATAXAJAPQAXAogGArQgCAbgPAWQgQAXgYAIQgKADgPAAIgIAAg");
	this.shape.setTransform(64.3792,16.8875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AJCBkQgRgFgKgNQgIgKgEgCQgFgEgNgBQgZgBgUgEQhCgMgigEQgSgCg0gBQgsgBgagEQgVgEgLgGQgRgKgDgQQgCgLAGgLQAGgLAMgHQAQgKAfgCQApgEA3ABQAzABAfAFIAeAGIAfAFIAsAEQAZADARAHQAUAIAWAUQAXAZABAVQACAQgKAPQgKAOgQAFQgHADgJAAQgIAAgIgDgApRAiQgggIgMgUQgJgNADgSQADgRANgKQANgLAhgFIBAgNQApgKAYgDQArgHBZgBQBRgBAvAEQAmAEARALQAPAJAIAQQAIAQgCARQgBARgLANQgLAOgQAFQgLAEgRgBIgcgDQgogFhFAAQhcAAgoAGIhLAMQgSADgQAAQgWAAgSgFg");
	this.shape_1.setTransform(66.8207,22.615);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},44).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,131.3,33.8);


(lib.girlmouthtalk = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF6699").s().p("Ag9AgQgLgKgOgZQgPgbgHgRICngDQARAAAJADQAOADAGAKQAFAIgBAKQgBAKgGAHQgIAMgXAMQgmAVgcAEIgOABQgfAAgVgTg");
	this.shape.setTransform(30.0173,17.4781);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgtCoQgngOglgiQgbgagPgcQgPgggJgPIgYgjQgOgWgDgRQgEgRgCgDQgDgFgGgEIgLgHQgIgGgEgKQgDgLAEgJQAFgKAUgHQAhgLAsgFQAbgEA1gDICQgIQArgDAYACQAmADAaAOQAhASAUAlQATAiADApQAFBEgjAtQgRAWghAUQgwAeg3ANQgiAJggAAQghAAgegKgAhMgyQAHARAPAaQAOAZALALQAaAXAogGQAcgDAmgVQAXgNAIgKQAGgJABgJQABgLgFgIQgGgJgOgEQgJgCgRAAg");
	this.shape_1.setTransform(26.8047,17.817);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAEBPIg5AAQgiAAgYgEQhEgKgjgnQgSgTgDgSQgEgbARgPQAQgOAdAFQAMABAUAHIAhAKQAUAEAfgCIAzgCIBDABQAnAAAagNIAUgLQAMgGAJgDQASgFATAIQATAHAJAQQAMATgFAZQgEAXgQASQgcAeg3AIQgaAGgmAAIhAAAg");
	this.shape_2.setTransform(26.0077,8.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2}]},5).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,53.6,35.6);


(lib.girlmouthclosed = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAEBPIg5AAQgiAAgYgEQhEgKgjgnQgSgTgDgSQgEgbARgPQAQgOAdAFQAMABAUAHIAhAKQAUAEAfgCIAzgCIBDABQAnAAAagNIAUgLQAMgGAJgDQASgFATAIQATAHAJAQQAMATgFAZQgEAXgQASQgcAeg3AIQgaAGgmAAIhAAAg");
	this.shape.setTransform(26.0077,8.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2.4,0.7,47.300000000000004,15.8);


(lib.girlhand3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFC3C3").s().p("AA2ESQgrgHhJgZQgugQgagNQgMgGgVgNIghgTIgdgPIgdgQQgbgSgkghQghgegLgXQgKgWAAgdQgCg6AcgdQAbgeA7gCQgcgQgMgPQgPgVACgcQADgdAUgRQAQgPAZgFQA2gMBFAmQAQAJAmAZQAiAXAUALIAhAQQAUAKAMAJIAdAYIAFAEQABgtALgZQARgnArgSQAsgSAnARQAmAQAdAsQAKARALAXIASAqQAYA1AHAeQAGAbAAA0QAAA1gKAbQgJAagjArQgSAXgMALQgSASgSAIQgSAJgaADQgQACgeAAQhLAAglgGg");
	this.shape.setTransform(37.5682,27.9651);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,75.2,56);


(lib.girleyes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000099").s().p("AnPBoQgbgNgPgeQgPgcACggQABgMAEgLQAFgRALgLQAMgMAdgNQAZgMANAFQAGACAGAFIALAJIAOAKQAKAGAEAFQAGAFAFAIQANAXgCAmQgDAbgIAQQgOAbggAJQgNAEgMAAQgTAAgRgIgAG5BeQghgCgigZQgSgNgJgMQgTgbABg0QABgSADgMIADgIQAKgUAXgJQASgIAZABQAeACAcAPQApAYAFAkIACANIAAADIABAqQgCAZgLAQQgKAPgSAIQgPAGgRAAIgFAAg");
	this.shape.setTransform(56.2634,18.9302);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AJvCKQgXgEgYgSIgqgjIgTgQQgigYgwgJQgegFggAAIgJAAIgBgNQgGgjgogXQgcgQgegBQgZgCgTAIQgXAJgJAUIgDAJIgEgIQgHgQADgQQAFgcAdgPQAVgLAigFQAngFBPgCIA3AAQAeABAYAGQAXAFAkAOQAjAMATAMIAWAQIAVARIAlAbQAVAQAJARQALAUgCAYQgCAYgNASQgNATgXAJQgPAGgPAAIgOgCgArEgCQgJgOAAgQQgBgSAKgMQAKgNAbgLQBFgeAjgGIBFgJIA8gGQAWgCAsAAIA0AAQAcAAAOAEQAaAIAQAaQAPAYgCAcQgCAXgPASQgQASgWAFQgPADgUgEIgjgGQgYgDgmAEIg+AGIgoABQgEgHgGgGQgFgDgJgGIgOgKIgLgKQgHgFgFgCQgNgEgaALQgdANgLANQgLAKgGAQQgZgIgOgUg");
	this.shape_1.setTransform(71.8142,13.964);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AHMBuQg2gEhYgWQgtgNgagLQglgSgVgZQgQgUgEgUQgEgaAPgRQATgYAnAEQAOACASAGIAeAKQAYAHAXAFQBSATAvAFQAnAEA3gCQAggBAPACQAZADAQAMQAOAKAIAQQAHAQgBASQgBARgKAPQgKAPgQAIQgPAHgUACIgmABIg4ABQglAAgXgCgAlhAmIhvgBQgzAAgZgEQgJgBgmgIIgigIQgTgFgNgIQgQgIgJgPQgJgQADgRQADgPANgNQAXgXAsgGQAVgCA0ADQA9AEBrgDQAggBASADQAcAEARAOQANAKAHAQQAHAQgBARQgBAQgJAOQgJAPgOAJQgQAJgXADIgcABIgOAAg");
	this.shape_2.setTransform(70.8265,19.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2}]},29).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,143.7,31.1);


(lib.button2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.CachedBmp_8();
	this.instance.setTransform(-117.85,-45.3,0.3629,0.3629);

	this.instance_1 = new lib.CachedBmp_11();
	this.instance_1.setTransform(-217.55,-117.4,0.3629,0.3629);

	this.instance_2 = new lib.CachedBmp_10();
	this.instance_2.setTransform(-117.85,-45.3,0.3629,0.3629);

	this.instance_3 = new lib.CachedBmp_9();
	this.instance_3.setTransform(-217.55,-117.4,0.3629,0.3629);

	this.instance_4 = new lib.CachedBmp_12();
	this.instance_4.setTransform(-117.85,-45.3,0.3629,0.3629);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},1).to({state:[{t:this.instance_1},{t:this.instance_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-217.5,-117.4,435.5,234.8);


(lib.button1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(-117.9,-45.35,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_5();
	this.instance_1.setTransform(-217.6,-117.45,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_4();
	this.instance_2.setTransform(-117.9,-45.35,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_3();
	this.instance_3.setTransform(-217.6,-117.45,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_6();
	this.instance_4.setTransform(-117.9,-45.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},1).to({state:[{t:this.instance_1},{t:this.instance_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-217.6,-117.4,435.5,235);


(lib.___Camera___ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-641,-361,1282,722);


(lib.girlprofiletalking = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// nosalines
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7D5D5D").s().p("AEuGMQgSgDgOgLQgPgNgBgRQgBgRATgZQAWgeAXgPQAggUA6gFQBWgHAMgDQAZgGAngQQAXgJALgGQATgKALgLQAXgVAJgmQAHgbACgxQAEhOgDguIgQiEQgIhOANgzQAHgcAOgLQAKgIAPgBQAOgBALAIQALAIAHAQQAFALAEAUIAXBrQAQBNAEAbQALBOABBdQABAngDAYQgDAigLAbQgJAWgaAoQgfAvgVATQgTARgcAPQgSAKgiAOQg3AXgbAGQgoAKg9gCIg9gBIgiAEIgTABIgQgBgAAEDQQgZgIgNgGQgMgFgkgZQgqgBgngPQgPgGgUgKIgjgTQgagNgPgBQgJAAgTAEQg3AKh8AFIjtAJQgtACgVgLQgOgIgJgOQgIgOgBgQQgCgqA4gsQAfgYAZgLQA1gaBMABQArABAgAHIAlAIQAnABATADQAXACAwAQQBOAaAkAQQAXALAyAdQAoAXAUARQANALAKAMIARAMQAcAVANAMQAUAUAKAVQAFAMgEAFQgDAEgGAAQgFAAgFgCg");
	this.shape.setTransform(-138.6242,89.9194);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(184).to({_off:true},1).wait(3));

	// upperlip
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF66CC").s().p("AoZGOQgfgIgpgUIhFgkIgtgXQgZgNgQgOQgYgTgVgfQgNgSgXgnQglhAgOglQgWg5gEhDQgFhlAgheQAkhqBHgeQAKgEAMgDIALgEQAmgNAwgBQBbAABVAkQAkAQA5AiQBFArAWALQAvAZBUAgQBjAmAiAQQAoASBRAtQBPAsArATIBkAmQA8AXAlAWIAzAfQAeASAYAHQAdAIA2gCIArAAIADgBIA4gNQAMgCAkgCQAegCARgEIAkgMQAVgHAPAAQARAAAQAIQAQAIAJAOQAKAOADARQADASgGAQQgJAagbASQgVAPgkAJQgRAEgYAEIgqAGIhhAQIhXALIiNAPQhGAIguADIgWAKQgRAHgiAKQiDAkhKAKQg6AIhoADQhqADhZgEQgmgCgWgDIgKgBQgYAQghAFQgNACgNAAQgZAAgbgHg");
	this.shape_1.setTransform(-123.7119,278.1692);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF66CC").s().p("Ao0GNQgegIgngTIhFgkIgtgWQgZgOgQgNQgYgTgVgfQgNgSgXgoQglhAgOgkQgWg6gEhCQgFhmAgheQAkhpBHgeQAKgFAMgDIALgEQAmgNAwAAQBbgBBVAkQAkAQA5AjQBBAoAVALQA0AZBUAfQBpAnAoAUQAmARBPAtQBNArAqASQAMAGBbAhQA8AXAoAVIA6AfQAgARAbAHQAbAHAzgBQAYgBASABIALAAIBAgLIA+gDIA9gCIAmgHQAVgFAPABQAQACANAJQAOAJAGAOQAIAOgBAQQgUARgdAQQgKAZgbARQgYAOgnAJQgZAGgZAEIg0AHIhpARIhYAKIiIAOQhEAIgsACQgLAFgOAEQgTAGgiAJQh7AhhJAKQg6AHhkADQhmABhWgFQgkgCgXgEIgIgBQgaAOghADQgLACgMAAQgYAAgagHg");
	this.shape_2.setTransform(-121.3382,278.1053);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF66CC").s().p("ApQGNQgdgIgkgSIhGgkIgsgWQgZgOgRgNQgXgTgWgfQgNgSgWgoQgmhAgOgkQgVg6gEhCQgGhmAhheQAkhpBGgeQAKgFANgDIALgEQAmgNAwAAQBagBBVAkQAlAQA4AjQA+AmAVALQA5AZBTAeQBuAoAvAYQAjAQBOAtQBKApApATQAPAHBbAgQA9AWArAVIBAAeQAjAQAdAHQAaAHAwgBIAoABIASABQA+gJALAAIBNgDQAuAAAdADQAbgEAOABQAUgDANAEQAPADAMAKQAMALADANQAFAOgEAPQgsAQgzAQQgMAXgbAPQgbAOgpAKQgiAIgZAEIg+AIIhyARIhZAKIiDANQhAAHgsACQgLAFgRADIg2AMQh0AfhIAJQg7AHhfACQhhABhTgHQgkgDgWgFIgIgBQgbANggABIgVABQgYAAgYgGg");
	this.shape_3.setTransform(-118.8509,278.0339);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF66CC").s().p("AmyGOQgigEgVgGIgJgBQgcAMggAAQgfADghgJQgbgHgjgRIhFgkIgtgXQgZgNgQgOQgYgTgVgfQgNgSgXgnQglhBgOgkQgWg5gEhDQgFhmAgheQAkhpBHgeQAKgEAMgDIALgEQAmgNAwgBQBbAABVAkQAkAQA5AiQA6AkAUALQA+AYBTAeQBzAoA1AdQAhAPBNAtQBHAoApASQASAJBaAfQA+AWAuAUIBGAdQAlAQAhAHQAYAHAsgBQAWgBASACIAZACQBDgHAOAAIBcgCQA2AAAiAHQAegBAOAEQAUgCAMAFQAOAGAKAKQAKAMAAAOQACANgHAOQhDAQhLAPQgNAVgcAPQgcANgsAKQgqAJgbAFIhHAJIh6ARIhaAKIh/AMQg9AHgqACQgNADgTADQgWADggAHQhtAdhJAIQg6AGhaABQheAAhQgIg");
	this.shape_4.setTransform(-116.2335,278.2997);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF66CC").s().p("AnVGPQgigGgVgGIgIgBQgdALgggCQgdADgfgJQgagHgggQIhFgkIgtgXQgZgNgQgOQgYgTgVgfQgNgSgXgnQglhBgOgkQgWg5gEhDQgFhmAgheQAkhpBHgeQAKgEAMgDIALgEQAmgNAwgBQBbAABVAkQAkAQA5AiIBJAsICWA2QB5ApA7AhQAfAOBLAsQBFAnAnASQAWAKBaAfQA+AVAxATIBNAdQAoAPAjAIQAWAGApgCQAVAAARACIAiADQBGgFATABIBqgBQA/AAAnAKQAgABAOAHQAUABAMAHQANAHAIALQAHAOgDANQAAAMgLAOQhbAPhgAOQgPAUgcANQgfANgvALQgyALgcAEQgdAFg0AGIiCAQIhbALIh6ALQg6AGgqABQgNAEgVABQgZADgfAGQhlAZhIAIQg7AGhVAAQhaAAhMgKg");
	this.shape_5.setTransform(-113.5091,278.5997);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF66CC").s().p("AlcGcQhVgChKgLQgggGgVgHIgHgBQgfAJgfgEQgbACgdgIQgYgHgegPIhGgkIgsgWQgZgOgRgNQgXgTgWgfQgNgSgWgoQgmhAgOgkQgVg6gEhCQgGhmAhheQAkhpBGgeQAKgFANgDIALgEQAmgNAwAAQBagBBVAkQAlAQA4AjIBGApICZA1QB/AqBBAlQAdANBLAsQBCAmAmASQAYAMBbAdQA+AVA0ATIBTAcQAqAOAmAIQAVAFAlgBQAVAAARACIAoAEQBMgDAWABIB5AAQBHABAsANQAiAEAQAJQATADAKAIQANAJAGANQAFAOgHANQgCAMgOANQhyAPh4AOQgQARgcANQgiAMgxALQg7ANgcAEQghAGg6AGIiKARIhdAKIh1AKQg3AGgoABQgPADgXAAQgZABgfAGQhfAXhIAHQg1AFhIAAIgOAAg");
	this.shape_6.setTransform(-110.6811,278.9017);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF66CC").s().p("AmJGfQhRgChHgNQgfgHgUgIIgHgBQggAHgfgFQgZACgbgJQgWgGgcgOIhGgkIgsgWQgZgOgRgNQgXgTgWgfQgNgSgWgoQgmhAgOgkQgVg6gEhCQgGhmAhheQAkhpBGgeQAKgFANgDIALgEQAmgNAwAAQBagBBVAkQAlAQA4AjIBBAnQBNAYBRAcQCEArBIApQAaAMBLAsQA+AlAmARQAbANBaAeIB2AlIBaAcQAsAOApAIQATAEAigBQAUAAAQACIAxAGQBQgBAaABQAqABBdgBQBQACAxARQAkAGAQAMQATAEAKAKQALALAEANQADAQgKANQgFAMgRALIkYAcQgRAQgdAMQgkALgzAMQhEAPgdAEQgkAGhBAHIiSARIheAKIhwAIQg1AHgmAAQgPACgZgBQgcABgeAEQhYAVhIAGQgvAEg8AAIgbAAg");
	this.shape_7.setTransform(-107.7802,279.2088);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF66CC").s().p("Am2GiQhOgDhDgOQgegIgUgJIgHgBQghAGgfgHQgXABgYgIQgVgGgagNIhFgkIgtgWQgZgOgQgNQgYgTgVgfQgNgSgXgoQglhAgOgkQgWg6gEhCQgFhmAgheQAkhpBHgeQAKgFAMgDIALgEQAmgNAwAAQBbgBBVAkQAkAQA5AjIA8AkQBSAZBRAbQCJArBPAuQAXALBKArQA8AkAkARQAfAPBaAdIB5AkIBgAbQAvANAsAIQARAEAfgBQATAAAQADIA4AGQBUABAeACQAvABBngBQBYADA3AVQAlAIARAOQASAHAKAMQAKAMACAOQABASgNAMQgIAMgUAKIlGAbQgSAOgeAKQgmAMg2AMQhNAQgdAFQgoAGhHAHIibASIhfAJQg3AFg0ADQgwAGgmAAQgQACgcgCQgegBgdAEQhRAShHAFQgqADgxAAIgmAAg");
	this.shape_8.setTransform(-104.8363,279.5201);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF66CC").s().p("AnjGlQhLgEg/gQQgdgIgUgLIgHAAQgiAEgegJQgVABgWgIQgTgGgYgLIhGgkIgsgXQgZgNgRgOQgXgTgWgfQgNgSgWgnQgmhAgOglQgVg5gEhDQgGhlAhheQAkhqBGgeQAKgEANgDIALgEQAmgNAwgBQBaAABVAkQAlAQA4AiQAoAZARAJQBWAYBRAbQCPAtBUAxQAWAKBHAsQA7AiAjARQAiAQBZAcQA/ASA9ARIBoAaQAxANAvAIQAPAEAbgBQATAAAPADIA/AIIB7AEQA1ACBvgBQBhAEA8AYQAoAKASASQARAIAIANQAKAPAAAPQgBASgQANQgKALgYAJIl1AaQgTANgeAJQgoAKg5ANQhWASgeAFQgsAHhMAHIijASIhgAKIhmAGQguAGglgBQgRABgegCQgggCgcADQhKAPhGAFQglADgoAAIgvgBg");
	this.shape_9.setTransform(-101.8648,279.861);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF66CC").s().p("AoRGoQhHgFg8gRQgcgJgTgMIgHAAQgjACgegKQgTAAgTgHQgSgGgWgKIhGgkIgsgXQgZgNgRgOQgXgTgWgfQgNgSgWgnQgmhAgOglQgVg4gEhEQgGhlAhheQAkhqBGgeQAKgEANgDIALgEQAmgNAwgBQBaAABVAkQAlAQA4AiIA0AfQBcAZBQAaQCUAtBbA2QATAJBHArQA4AiAjAQQAkASBZAbQBAARBAARIBtAZQA0ANAyAIQANADAYgBQASAAAPADIBHAJICDAHQA5ACB6AAQBoAEBCAbQAqANASAUQARALAIAPQAIAQgBAQQgEAUgTAMQgNAKgbAIImjAaQgUALgfAHIhmAYQheAUgfAEQgvAIhTAIIirASIhhAJQgyAEgwACQgqAFgkgBQgSABgggEQgigDgbADQhDAMhGAEQgfACghAAIg3gBg");
	this.shape_10.setTransform(-98.8786,280.1815);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FF66CC").s().p("Ao/GqQhDgFg5gTQgbgKgTgMIgGgBQgkABgegLQgRgBgRgHQgQgFgUgKIhGgkIgsgWQgZgOgRgNQgXgTgWgfQgNgSgWgoQgmhAgOgkQgVg5gEhDQgGhmAhheQAkhpBGgeQAKgFANgDIALgEQAmgNAwAAQBagBBVAkQAlAQA4AjIAwAcQBhAZBPAZQCaAuBhA6QARAJBFAqQA2AhAiAQQAnATBZAaQBAARBDAQIB0AZQA2AMA1AIQAMACAUAAQARAAAOADIBPAKICMAJQA+ADCDgBQBxAFBHAgQArAPAUAWQAQANAHAQQAHASgDARQgFAVgXANQgPAKgeAGInSAZQgVAJgfAHIhrAXQhnAWgfAFQg0AIhZAIIizATIhiAIQgwAEgtABQgoAFgjgBQgSAAgigFQgkgEgbACQg8AKhFADIguABQgiAAgigCg");
	this.shape_11.setTransform(-95.8698,280.5147);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FF66CC").s().p("AkPGvQgUAAgkgGQgmgFgaABQg0AHhFADQg6ACg0gEQg+gHg2gUQgagKgTgOIgFAAQgmgBgegNQgPgBgOgHQgPgFgSgIIhFgkIgtgXQgZgNgQgOQgYgTgVgfQgNgSgXgnQglhAgOglQgWg4gEhEQgFhlAgheQAkhqBHgeQAKgEAMgDIALgEQAmgNAwgBQBbAABVAkQAkAQA5AiIArAaQBmAZBOAYQCgAvBnA/QAPAHBEAqQAzAgAhAPQArAVBYAZQBAASBHAOIB7AYQA4AMA3AIQAKACASgBQAQAAAOAEIBWALQBnAJAtACQBDADCNAAQB5AGBMAjQAuARAUAZQAQAPAGASQAGAUgFARQgIAXgaAMQgRAKgiAFIn/AYQgXAIgfAFIhwAXQhwAYggAFQg3AIhfAJIi7ATIhjAJQguADgrAAQgcAEgbAAIgPgBg");
	this.shape_12.setTransform(-92.8311,280.867);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FF66CC").s().p("AlGG2QgUgBgngHQgogGgZAAQgtAFhEACQg6ABgvgEQg7gHgygWQgZgMgTgOIgFAAQgngCgdgPQgNgCgMgGIgdgMIhGgkIgsgXQgZgNgRgOQgXgTgWgfQgNgSgWgnQgmhAgOglQgVg4gEhEQgGhlAhheQAkhqBGgeQAKgEANgDIALgEQAmgNAwgBQBaAABVAkQAlAQA4AiIAnAYQBrAYBOAYQClAwBuBCIBPAxQAxAeAfAPQAvAXBYAYQBAARBJAOICCAXIB1AUQAIABAOgBQAPAAAOAEIBeANQBrAKAxADQBJAECVAAQCCAGBSAmQAvAUAVAcQAQAQAFAUQAFAWgHASQgKAYgdAMQgUAJglAFIotAXQgZAFgfAFQgyAJhEAOQh3AZghAFQg7AKhlAJIjDATIhlAIQgsADgogBQgXAEgXAAIgUgBg");
	this.shape_13.setTransform(-89.7688,281.5554);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF66CC").s().p("Al9G9QgWgCgogHQgqgHgYgBIhqADQg6ABgqgFQg3gIgvgYQgYgMgSgPIgFAAQgogDgdgRQgLgCgKgGIgZgLIhGgkIgsgXQgZgNgRgOQgXgTgWgfQgNgSgWgnQgmhAgOglQgVg4gEhEQgGhlAhheQAkhqBGgeQAKgEANgDIALgEQAmgNAwgBQBaAABVAkQAlAQA4AiIAjAVQBvAYBOAXQCrAxBzBHQALAGBBApQAvAdAeAPQAyAYBYAYQBAAQBNAOQAtAIBbAOIB6ATIARABQAOgBAOAFIBlANQBwAMA1ADQBNAFCgAAQCKAHBWAqQAyAWAWAfQAPASAEAVQAFAYgJATQgMAZghAMQgWAJgoAEIpcAVIg6AIQg0AIhGAPQiAAbgiAFQg/AKhrAJIjLAUIhmAIQgpACgmgBQgTADgTAAIgYgBg");
	this.shape_14.setTransform(-86.6898,282.2727);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FF66CC").s().p("Am0HEQgWgCgrgJQgsgIgXgCIhiABQg6AAgmgGQgygJgsgZQgXgNgSgQIgFAAQgpgFgdgSQgIgDgIgFIgWgKIhFgkIgtgXQgZgNgQgOQgYgTgVgfQgNgSgXgnQglhAgOglQgWg4gEhEQgFhlAgheQAkhqBHgeQAKgEAMgDIALgEQAmgNAwgBQBbAABVAkQAkAQA5AiIAeATQB1AYBNAWQCwAyB6BLIBIAuQAsAcAeAPQA0AZBYAWQBBARBPANICPAVIB/ATIAMAAQAOAAANAEIBtAPQB1AOA4ADQBTAFCoAAQCTAIBcAuQAzAYAXAhQAPAUADAYQADAZgKAUQgPAbgjALQgZAJgsACIqKAVIg7AEQg3AIhIAPQiJAdgiAGQhDAKhxAKIjTAUIhoAIQgnABgjgBQgQACgRAAIgZgBg");
	this.shape_15.setTransform(-83.6211,282.9767);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FF66CC").s().p("AnrHLQgXgDgtgJQgugKgWgCQgZgDhCAAQg6gBghgGQgugKgpgaQgWgOgSgRIgEAAQgqgGgdgUIgMgJIgSgIIhFgkIgtgXQgZgNgQgOQgYgTgVgfQgNgSgXgnQglhAgOglQgWg4gEhEQgFhlAgheQAkhqBHgeQAKgEAMgDIALgEQAmgNAwgBQBbAABVAkQAkAQA5AiIAaAQQB5AYBNAWQC1AyCBBQIBFAsQApAbAdAPQA3AbBZAVQBAAQBTANQAxAIBkAMICEASIAHAAQANAAAMAEIB1AQQB6AQA8AEQBXAFCzABQCaAIBiAxQA1AbAYAkQAOAWACAZQADAbgNAVQgQAcgnALQgcAIguACIq5AUIg9ABQg5AIhLAPQiRAfgjAFQhGALh3ALIjcAUQhIAGghABQglABgggCQgOACgOAAIgagBg");
	this.shape_16.setTransform(-80.519,283.6888);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FF66CC").s().p("AnrHLQgXgDgtgJQgugKgWgCQgZgDhCAAQg6gBghgGQgugKgpgaQgWgOgRgRIgFAAQgqgGgdgUQgGgEgFgFIgTgIIhFgkIgtgXQgZgNgQgOQgYgTgVgfQgNgSgXgnQglhAgOglQgWg4gEhEQgFhlAgheQAkhqBHgeQAKgEAMgDIALgEQAmgNAwgBQBbAABVAkQAkAQA5AiIAaAQQB5AYBNAWQC1AyCBBQIBFAsQApAbAdAPQA3AbBZAVQBAAQBTANQAxAIBkAMICEASIAHAAQANAAANAFIB0APQB6AQA8AEQBXAFCzABQCaAIBiAxQA1AbAYAkQAOAWACAZQADAbgNAVQgQAcgnALQgcAIguACIq5AUIg9ABQg5AIhLAPQiRAfgjAFQhGALh3ALIjcAUQhIAGghABQglACgggDQgOACgOAAIgagBg");
	this.shape_17.setTransform(-80.519,283.6939);
	this.shape_17._off = true;

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FF66CC").s().p("AmUGNQgjgDgWgFIgIgBQgbAMggACQghAEgkgKQgcgHgkgSIhGgkIgsgXQgZgNgRgOQgXgTgWgfQgNgSgWgnQgmhAgOglQgVg5gEhDQgGhlAhheQAkhqBGgeQAKgEANgDIALgEQAmgNAwgBQBaAABVAkQAlAQA4AiQA9AmAVALQA6AZBTAeQBvAoAvAZQAjAQBOAsQBKAqApASQAPAHBbAgQA9AXArAUIBBAeQAkAQAeAIQAZAGAvgBQAXAAASABIATABQA+gIAMAAIBPgDQAvAAAdADQAcgDAOABQAUgCANADQAPAEAMAKQALALADANQAEAOgEAPQgvAQg3APQgMAXgbAQQgbANgqAKQgiAIgaAEIg/AJIhzAQIhZALIiDANQhAAHgrACQgMAEgRADIg2AMQhzAfhIAJQg7AHheABIgOABQhZAAhNgHg");
	this.shape_18.setTransform(-118.4773,278.0514);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FF66CC").s().p("AngGPQghgFgVgHIgIgBQgdAKgggDQgdADgegJQgZgHgggPIhFgkIgtgXQgZgNgQgOQgYgTgVgfQgNgSgXgnQglhBgOgkQgWg5gEhDQgFhmAgheQAkhpBHgeQAKgEAMgDIALgEQAmgNAwgBQBbAABVAkQAkAQA5AiQA1AhATAKICXA2QB6AqA9AhQAeAOBMAtQBEAmAnASQAWAKBaAfQA+AUAyAUIBPAdQAoAPAkAHQAWAGAogBQAVgBARACIAkAEQBIgEATAAIBugBQBCABAoALQAhACAPAHQATABALAIQANAHAIAMQAGAOgEANQgBAMgLANQhhAQhoAOQgPATgcANQggANgvAKQg1AMgcAEQgeAFg2AGIiEARIhcAKIh4ALQg6AHgpAAQgNADgWACQgZACgeAFQhkAahIAHQg7AGhUAAQhYgBhMgKg");
	this.shape_19.setTransform(-112.7136,278.6997);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FF66CC").s().p("AmcGgQhQgDhFgNQgegHgVgJIgHgBQggAHgfgGQgYACgagJQgWgGgbgNIhFgkIgtgXQgZgNgQgOQgYgTgVgfQgNgSgXgnQglhAgOglQgWg5gEhDQgFhlAgheQAkhqBHgeQAKgEAMgDIALgEQAmgNAwgBQBbAABVAkQAkAQA5AiQAtAcASAKQBPAZBRAbQCGArBLArQAZAMBKAsQA9AkAlARQAdAOBaAdIB3AlIBdAbQAuAOAqAIQASAEAhAAQATgBAQADIA0AGIBtABQAtABBhgBQBTACA0ATQAkAHARANQASAFAKALQALAMADANQACARgLANQgGALgTALQiTAOiYANQgSAQgdALQglALg1AMQhHAPgdAFQgmAGhEAHIiWARIheAKIhuAIQgzAGgmAAQgPACgagBQgdAAgeAEQhVAUhHAGQgwAEg6AAIgagBg");
	this.shape_20.setTransform(-106.5244,279.3588);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FF66CC").s().p("An+GmQhHgEg+gRQgdgIgTgLIgHgBQgiAEgfgKQgUAAgUgHQgSgGgXgLIhGgkIgsgWQgZgOgRgNQgXgTgWgfQgNgSgWgoQgmhAgOgkQgVg6gEhCQgGhmAhheQAkhpBGgeQAKgFANgDIALgEQAmgNAwAAQBagBBVAkQAlAQA4AjIA2AgQBaAYBQAaQCSAuBYA0QAUAJBHArQA6AiAiARQAjARBaAbQA/ASA/ARIBrAaQAyAMAxAIQAOAEAZgBQASAAAPADIBEAIICAAGQA3ACB1gBQBmAEA/AbQApALASATQARAKAIAOQAJAPgBAQQgCATgTANQgLAKgZAJImQAaQgUALgeAIIhkAYQhaATgfAFQguAHhQAIIinASIhhAJQgzAEgwACQgtAFgkAAQgRABgfgEQgigCgbADQhGANhGAFQggABghAAIg5gBg");
	this.shape_21.setTransform(-100.1634,280.0315);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FF66CC").s().p("AphGsQg/gGg3gUQgagKgTgNIgGgBQglAAgegMQgPgCgPgGQgQgFgSgJIhGgkIgsgXQgZgNgRgOQgXgTgWgfQgNgSgWgnQgmhAgOglQgVg4gEhEQgGhlAhheQAkhqBGgeQAKgEANgDIALgEQAmgNAwgBQBaAABVAkQAlAQA4AiIAtAbQBkAYBPAZQCeAvBlA9QAQAIBEAqQA0AgAhAPQAqAVBZAZQBAARBFAPQAoAJBRAQQA4ALA2AJQALACASgBQAQAAAOAEIBUALICSAKQBCADCKAAQB3AFBKAiQAtARAUAYQARAOAGASQAGATgEARQgHAXgaAMQgQAKghAGInyAYQgXAIgfAFIhvAYQhsAXggAFQg2AIheAJIi5ATIhiAIQgvADgrABQgmAEgigBQgTAAgkgGQglgEgaABQg3AIhFADIglABQgmAAgkgDg");
	this.shape_22.setTransform(-93.6978,280.758);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FF66CC").s().p("Al1G8QgVgBgpgIQgpgHgYgBQgoADhEABQg5ABgsgFQg2gIgwgXQgYgMgSgPIgGgBQgngCgegRQgLgCgKgGIgagLIhFgkIgtgXQgZgNgQgOQgYgTgVgfQgNgSgXgnQglhAgOglQgWg4gEhEQgFhlAgheQAkhqBHgeQAKgEAMgDIALgEQAmgNAwgBQBbAABVAkQAkAQA5AiIAjAWQBvAYBOAXQCpAxBzBGQALAFBCAqQAuAdAfAQQAxAXBYAYQBBAQBMAPICHAWIB5ASQAHABALAAQAOAAAOAEIBkANQBwAMA0ADQBMAFCeAAQCJAGBWAqQAyAWAVAeQAPASAFAVQAEAXgIAUQgMAZggAMQgWAIgoAEIpVAWIg6AIQg0AIhFAPQh/AbgiAFQg+AKhqAJIjKAUIhmAIQgqACglgBQgUADgVAAIgWgBg");
	this.shape_23.setTransform(-87.1369,282.1693);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FF66CC").s().p("AmPG/QgWgCgpgHQgrgIgXgBIhoACQg6ABgpgGQg1gIgugYQgXgMgSgQIgFAAQgpgEgdgRQgKgCgJgGIgYgLIhGgkIgsgWQgZgOgRgNQgXgTgWgfQgNgSgWgoQgmhAgOgkQgVg5gEhDQgGhmAhheQAkhpBGgeQAKgFANgDIALgEQAmgNAwAAQBagBBVAkQAlAQA4AjIAhAUQByAYBNAXQCsAxB2BIQAKAFBBAqQAtAdAfAPQAyAYBYAXQBBARBNANQAuAIBdAOIB7ATIAQAAQAOAAANAFIBoANQByANA2ADQBPAFCiAAQCNAHBZArQAyAXAWAgQAPASAEAXQAEAYgJATQgNAagiAMQgXAIgpAEIpsAVQgaAEggACQg1AJhHAOQiDAcgiAFQg/AKhuAKIjOAUIhmAIQgpACgkgCQgUADgVAAIgUgBg");
	this.shape_24.setTransform(-85.6783,282.508);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FF66CC").s().p("Ak0G0QgUgBgmgGQgngGgZAAQgwAGhEACQg6ACgxgFQg8gHgzgVQgZgLgTgOIgGgBQgmgBgegOQgNgCgNgGQgOgFgQgIIhGgkIgsgWQgZgOgRgNQgXgTgWgfQgNgSgWgoQgmhAgOgkQgVg5gEhDQgGhmAhheQAkhpBGgeQAKgFANgDIALgEQAmgNAwAAQBagBBVAkQAlAQA4AjIApAYQBpAYBOAYQCjAwBsBBQANAHBDAqQAyAfAgAPQAtAWBYAZQBAARBJAOIB/AXQA6ALA5AJQAJABAPAAQAQAAANAEIBcAMQBqAJAvADQBHAECTAAQB/AFBPAmQAvATAVAbQAQAPAFAUQAGAVgHASQgJAYgcAMQgTAJgkAFIoeAXQgYAGggAFQgxAJhCAOQh1AZghAFQg5AJhkAJIi/ATIhlAJQgsACgpAAQgYADgXAAIgVAAg");
	this.shape_25.setTransform(-90.7958,281.3304);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FF66CC").s().p("AnzGmQhJgFg+gQQgdgIgTgLIgHgBQgiAEgfgJQgUAAgVgHQgTgGgXgLIhGgkIgsgXQgZgNgRgOQgXgTgWgfQgNgSgWgnQgmhAgOglQgVg5gEhDQgGhlAhheQAkhqBGgeQAKgEANgDIALgEQAmgNAwgBQBaAABVAkQAlAQA4AiIA3AhQBZAZBQAaQCQAtBXAzQAVAKBHArQA6AiAiARQAjAQBaAcIB9AjIBqAaQAyAMAvAIQAPAEAagBQASAAAPADIBDAIIB9AFQA2ACBzAAQBjADA+AaQApALASASQARAJAIAOQAJAPAAAPQgCATgRANQgLALgZAIImEAaQgUAMgeAJQgpALg6AMQhYATgeAFQgtAHhPAIIimASIhgAJQg0AEgxACQgtAFgkAAQgRABgfgDQghgCgbADQhIAOhGAFQgjACglAAIgzgBg");
	this.shape_26.setTransform(-100.8648,279.9647);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FF66CC").s().p("AmnGhQhPgDhEgOQgegHgVgJIgHgBQggAHgfgHQgYACgZgIQgVgHgbgNIhFgkIgtgWQgZgOgQgNQgYgTgVgfQgNgSgXgoQglhAgOgkQgWg6gEhCQgFhmAgheQAkhpBHgeQAKgFAMgDIALgEQAmgNAwAAQBbgBBVAkQAkAQA5AjQAsAbASAKQBQAYBRAcQCIArBMAsQAYAMBKArQA9AkAlARQAdAPBaAdIB4AkIBeAbQAuAOArAIQASAEAggBQATAAAQADIA1AGIBwABQAuACBjgBQBVACA1AUQAlAHARAOQASAGAKALQAKAMADAOQACARgMAMQgHAMgTAKIk3AcQgSAPgdAKQglALg2AMQhKAQgdAFQgnAGhEAHIiYASIhfAJQg3AFg2ADQgyAGglAAQgQACgbgBQgdgBgeAEQhTAThHAGQgrADg0AAIgkAAg");
	this.shape_27.setTransform(-105.8315,279.4184);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FF66CC").s().p("Am9GPQgigFgVgGIgIgBQgdALgggBQgfAEgggKQgbgHghgQIhGgkIgsgXQgZgNgRgOQgXgTgWgfQgNgSgWgnQgmhBgOgkQgVg5gEhDQgGhmAhheQAkhpBGgeQAKgEANgDIALgEQAmgNAwgBQBaAABVAkQAlAQA4AiQA5AjAUALQA/AZBTAdQB1ApA3AeQAhAPBMAsQBHAoAoASQATAJBaAfQA+AVAvAUIBJAeQAmAPAhAIQAXAGAsgBQAVgBASACIAcACQBEgGAQAAIBggBQA5AAAkAIQAegBAOAFQAUAAANAFQANAGAKALQAIAMgBAOQACANgJANQhLAQhRAPQgOAVgcAOQgdANgtAKQgtALgbAEIhKAJQgyAGhLALIhbAKIh9AMQg8AHgqABQgNAEgTACQgYADgfAHQhqAbhJAIQg6AGhZABQhcAAhPgIg");
	this.shape_28.setTransform(-115.3535,278.3997);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FF66CC").s().p("ApHGNQgdgIglgSIhGgkIgsgXQgZgNgRgOQgXgTgWgfQgNgSgWgnQgmhAgOglQgVg5gEhDQgGhlAhheQAkhqBGgeQAKgEANgDIALgEQAmgNAwgBQBaAABVAkQAlAQA4AiQA/AnAVALQA3AZBUAfQBsAnAtAXQAkAQBOAtQBLAqApASQAPAHBaAgQA9AXAqAVIA+AeQAiAQAdAIQAaAHAxgCQAXAAASABIAPABQA8gKAKAAIBIgCQAsgBAaABQAcgEAMAAQAVgDAOACQAPADAMAKQANAKAEAOQAGANgDAQQgkARgsAPQgLAXgcARQgZANgoAKQgfAHgaAEIg6AIIhvARIhYAKIiGAOQhBAHgsACQgLAFgQADIg1ANQh3AghIAJQg7AHhgACQhjABhUgGQgkgDgWgEIgJgBQgaANghACIgUACQgYAAgagHg");
	this.shape_29.setTransform(-119.6898,278.0589);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FF66CC").s().p("AoZGOQgfgIgpgUIhFgkIgtgXQgZgNgQgOQgYgTgVgfQgNgSgXgnQglhAgOglQgWg5gEhDQgFhlAgheQAkhqBHgeQAKgEAMgDIALgEQAmgNAwgBQBbAABVAkQAkAQA5AiQBFArAWALQAvAZBUAgQBjAmAiAQQAoASBRAtQBPAsArATIBkAmQA8AXAlAWIAzAfQAeASAYAHQAdAIA2gCIArAAIADgBIA4gNQAMgCAkgCQAegCARgEIAkgMQAVgHAPAAQARAAAQAIQAQAIAJAOQAKAOADARQADASgGAQQgJAagbASQgVAPgkAJQgRAEgYAEIgqAGIhhAQIhXALIiNAPQhGAIguADIgWAKQgRAHgiAKQiDAkhKAKQg6AIhoADQhqADhZgEQgmgCgWgDIgJgBQgZAQghAFQgNACgNAAQgZAAgbgHg");
	this.shape_30.setTransform(-123.7119,278.1692);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_30}]},1).to({state:[]},1).wait(3));
	this.timeline.addTween(cjs.Tween.get(this.shape_1).to({_off:true},1).wait(73).to({_off:false},0).to({_off:true},1).wait(68).to({_off:false},0).wait(40).to({_off:true},1).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(16).to({_off:false},0).wait(52).to({_off:true},1).wait(13).to({_off:false},0).wait(51).to({_off:true},1).wait(54));

	// Layer_7
	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#DEA6A6").s().p("EAX8ApxIg2kQQggikglhpQhBi2i6kVIiTjbQhRh/gxhmQhOijgmiyQgnizAFi0QABhEAfgYQAWgQAfAGQAeAGAUAXQASASALAeQAIATAJAlQArCoAfBhQAuCRA2BuQBGCOC1D7QC3D/BFCIQCNEXAVFQQATE+haE/QhhjYgzjfgArpV2QglgGgmgbQgcgVgiglIgkgmQgVgVgUgLQgYgOgagDIgLAAQiRhviAhGIgJgEIgpggQh6hcg6gzQhfhUg8hTIgvhFQgPgUgNgQIAPgYQAVgeAagOQAfgQAoAEQAjAEAmASQATAKAuAcQAoAZAZAKQAPAGBMAXQA4AQAdAWIAgAYQATANARgBQAMgBASgJQAVgLAKgBQAKgCAYAEQAWAEAMgDQAMgDAOgMIAXgVQAagXAigHQAjgIAhAKIAxAUQAdALAUgCQAPgBAUgKIAhgQQAqgRA8AHIBpASQAvAIAogBQBLgBAtgfQAKgHA4g6QAngoAjgEQgXgwgKgXQgQgogHgiQgHgoAGgmQAIgpAXgdQALgNAXgUQAZgVAJgKIAcgkQARgXAOgKQAjgbAxAFQAnAEAlAVQgGgMgIgNQgIgOgVgcIipjkQhThrglg5QgYgnAAgYQAAgVAOgTQAOgTAVgIQAqgPArAYQAUALAVAWIAjAoIAjAlIAkAlQAjAlBABQQBKBbAmA4QBrCbBNDZQAnBvAWBiQAUBcAABFQACBegdBjQgXBSg0BtQgPAfgLARQgQAagSAQQgWASgbAGQgdAGgXgMQgFAagZASQgXAQgfADQgUACgjgDQgogDgQAAIg0AGQgdADgUgDQgggGgagXQgKgJgHgLIgoAIQgbAGgPAIQgNAHgPAQIgZAaQgqAlg8gDQg9gDgmgoQgFBciPA8QgoARgeAHQgYAGgVAAQgOAAgNgDgADPLeIAFgGQANgTAEgqIABgOQgKArgNAmgAP4vWIgDihQgBhhgGg/QgIhNgUheQgMg5gdhwQgdhygRg6QgdhegihHQgKgVhoi3QhGh7gVhZQgThPAFhjQADhHAThtQAVh+AYhaQAShDAZggQASgWAZgMQAbgMAaAFQAeAGAVAcQATAaAFAhQAEAcgFAkQgCAOgLAxQgaB9gECAQgCBxAWBGQANAlAZAtIAuBNQCXD2BVEWQBWEWAOEfQAEBYgFBBQgGBSgVBDQgZBNguA7QgxBAhCAgQgxh2gHjAg");
	this.shape_31.setTransform(-100.6022,17.2015);

	this.timeline.addTween(cjs.Tween.get(this.shape_31).wait(184).to({_off:true},1).wait(3));

	// top_face
	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFC3C3").s().p("EBP7BoMQ3Njx94mAUgLYgCTgpcgIuQqiiOlpg/Qo/hlnVgjQydhYuIEoIgPAFQhjhEgugnQhVhGgjhJQgZg1gIhGQgFg0ADhOQAEh7ARhZQAWhyAvhWQAOgZBEhmQA0hNATg3QAXhFgChbQgBg5gPhrIgWiaIgYgPIpymRQhZg5gtghQhIg2gxg1QhWhegth+Qgsh7ABiDQACh/Arh+QAph5BLhtQA4hRBaheICiiiQL4rtEvswQBCiwA9jkIAWhVIgGivQgQjGh2kpIhijxQg3iNgchpQg0jAgEjIQgEjJAsjCQAGgaAmiMQAbhlALhCQALhHAGh8QAGiOAGg1QAKhdAgiRQArjDAIgqQAOhNAbjXQAXi5AZhqQAbh2A+irIBnkeQAihlA7jRQA7jQAihmQA8ixBJiLQgOgigJgkQg1jFBcihQBginDohhQBYglB9giIDag4QCCgiFehvQEthgC1gmQJNh6KZCBQJMByJkEvQHfDtJfGeQFdDuKyHrQHNE+MPHxQO2JbEuDIQPFJ/I2IeQL8LdFQMlQB3EfBTFSQBIEmAyFjQBLIbgBHiQgBIYhgHfQhWGxjBIFQh0E3kJJfQg4B/gpBIIAAAFQAECNgqEBQhZIchLK5QgPCIgYDxQlAg3nRhLg");
	this.shape_32.setTransform(407.4482,-203.7583);

	this.timeline.addTween(cjs.Tween.get(this.shape_32).wait(184).to({_off:true},1).wait(3));

	// jaw
	this.instance = new lib.jawgirl("synched",0);
	this.instance.setTransform(361.2,355.3,1,1,0,0,0,558.5,185);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:631.9,regY:387.5,rotation:-0.7472,x:440.15,y:556.75},0).wait(1).to({rotation:-1.4944,x:445.7,y:555.75},0).wait(1).to({rotation:-2.2416,x:451.2,y:554.75},0).wait(1).to({rotation:-2.9888,x:456.75,y:553.65},0).wait(1).to({rotation:-3.736,x:462.2,y:552.55},0).wait(1).to({rotation:-4.4832,x:467.7,y:551.4},0).wait(1).to({rotation:-5.2304,x:473.1,y:550.25},0).wait(1).to({rotation:-5.9776,x:478.6,y:549.05},0).wait(1).to({rotation:-6.7248,x:484,y:547.8},0).wait(1).to({rotation:-7.472,x:489.45,y:546.5},0).wait(1).to({rotation:-8.2192,x:494.85,y:545.15},0).wait(1).to({rotation:-8.9664,x:500.25,y:543.85},0).wait(1).to({rotation:-9.7136,x:505.6,y:542.5},0).wait(1).to({rotation:-10.4608,x:510.9,y:541.1},0).wait(1).to({rotation:-11.208,x:516.25,y:539.65},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({rotation:-9.0683,x:502.45,y:543.4},0).wait(1).to({rotation:-6.9287,x:488.55,y:546.9},0).wait(1).to({rotation:-4.789,x:474.5,y:550.15},0).wait(1).to({rotation:-2.6494,x:460.3,y:553.1},0).wait(1).to({rotation:-0.5097,x:446,y:555.8},0).wait(1).to({rotation:-2.038,x:456.25,y:553.9},0).wait(1).to({rotation:-3.5663,x:466.45,y:551.85},0).wait(1).to({rotation:-5.0947,x:476.5,y:549.7},0).wait(1).to({rotation:-6.623,x:486.6,y:547.4},0).wait(1).to({rotation:-8.1513,x:496.5,y:544.95},0).wait(1).to({rotation:-9.6797,x:506.4,y:542.35},0).wait(1).to({rotation:-11.208,x:516.25,y:539.65},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({rotation:-10.2097,x:510.35,y:539.3},0).wait(1).to({rotation:-9.2113,x:504.45,y:538.9},0).wait(1).to({rotation:-8.213,x:498.4,y:538.45},0).wait(1).to({rotation:-7.2147,x:492.45,y:538},0).wait(1).to({rotation:-6.2163,x:486.4,y:537.4},0).wait(1).to({rotation:-5.218,x:480.4,y:536.8},0).wait(1).to({rotation:-4.2197,x:474.25,y:536.1},0).wait(1).to({rotation:-3.2213,x:468.15,y:535.4},0).wait(1).to({rotation:-2.223,x:462,y:534.6},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-292,-883.5,1399,1844.4);


(lib.girlprofilequiet = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// nosalines
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7D5D5D").s().p("AEuGMQgSgDgOgLQgPgNgBgRQgBgRATgZQAWgeAXgPQAggUA6gFQBWgHAMgDQAZgGAngQQAXgJALgGQATgKALgLQAXgVAJgmQAHgbACgxQAEhOgDguIgQiEQgIhOANgzQAHgcAOgLQAKgIAPgBQAOgBALAIQALAIAHAQQAFALAEAUIAXBrQAQBNAEAbQALBOABBdQABAngDAYQgDAigLAbQgJAWgaAoQgfAvgVATQgTARgcAPQgSAKgiAOQg3AXgbAGQgoAKg9gCIg9gBIgiAEIgTABIgQgBgAAEDQQgZgIgNgGQgMgFgkgZQgqgBgngPQgPgGgUgKIgjgTQgagNgPgBQgJAAgTAEQg3AKh8AFIjtAJQgtACgVgLQgOgIgJgOQgIgOgBgQQgCgqA4gsQAfgYAZgLQA1gaBMABQArABAgAHIAlAIQAnABATADQAXACAwAQQBOAaAkAQQAXALAyAdQAoAXAUARQANALAKAMIARAMQAcAVANAMQAUAUAKAVQAFAMgEAFQgDAEgGAAQgFAAgFgCg");
	this.shape.setTransform(-138.6242,89.9194);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// upperlip
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF66CC").s().p("AoZGOQgfgIgpgUIhFgkIgtgXQgZgNgQgOQgYgTgVgfQgNgSgXgnQglhAgOglQgWg5gEhDQgFhlAgheQAkhqBHgeQAKgEAMgDIALgEQAmgNAwgBQBbAABVAkQAkAQA5AiQBFArAWALQAvAZBUAgQBjAmAiAQQAoASBRAtQBPAsArATIBkAmQA8AXAlAWIAzAfQAeASAYAHQAdAIA2gCIArAAIADgBIA4gNQAMgCAkgCQAegCARgEIAkgMQAVgHAPAAQARAAAQAIQAQAIAJAOQAKAOADARQADASgGAQQgJAagbASQgVAPgkAJQgRAEgYAEIgqAGIhhAQIhXALIiNAPQhGAIguADIgWAKQgRAHgiAKQiDAkhKAKQg6AIhoADQhqADhZgEQgmgCgWgDIgKgBQgYAQghAFQgNACgNAAQgZAAgbgHg");
	this.shape_1.setTransform(-123.7119,278.1692);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_7
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#DEA6A6").s().p("EAX8ApxIg2kQQggikglhpQhBi2i6kVIiTjbQhRh/gxhmQhOijgmiyQgnizAFi0QABhEAfgYQAWgQAfAGQAeAGAUAXQASASALAeQAIATAJAlQArCoAfBhQAuCRA2BuQBGCOC1D7QC3D/BFCIQCNEXAVFQQATE+haE/QhhjYgzjfgArpV2QglgGgmgbQgcgVgiglIgkgmQgVgVgUgLQgYgOgagDIgLAAQiRhviAhGIgJgEIgpggQh6hcg6gzQhfhUg8hTIgvhFQgPgUgNgQIAPgYQAVgeAagOQAfgQAoAEQAjAEAmASQATAKAuAcQAoAZAZAKQAPAGBMAXQA4AQAdAWIAgAYQATANARgBQAMgBASgJQAVgLAKgBQAKgCAYAEQAWAEAMgDQAMgDAOgMIAXgVQAagXAigHQAjgIAhAKIAxAUQAdALAUgCQAPgBAUgKIAhgQQAqgRA8AHIBpASQAvAIAogBQBLgBAtgfQAKgHA4g6QAngoAjgEQgXgwgKgXQgQgogHgiQgHgoAGgmQAIgpAXgdQALgNAXgUQAZgVAJgKIAcgkQARgXAOgKQAjgbAxAFQAnAEAlAVQgGgMgIgNQgIgOgVgcIipjkQhThrglg5QgYgnAAgYQAAgVAOgTQAOgTAVgIQAqgPArAYQAUALAVAWIAjAoIAjAlIAkAlQAjAlBABQQBKBbAmA4QBrCbBNDZQAnBvAWBiQAUBcAABFQACBegdBjQgXBSg0BtQgPAfgLARQgQAagSAQQgWASgbAGQgdAGgXgMQgFAagZASQgXAQgfADQgUACgjgDQgogDgQAAIg0AGQgdADgUgDQgggGgagXQgKgJgHgLIgoAIQgbAGgPAIQgNAHgPAQIgZAaQgqAlg8gDQg9gDgmgoQgFBciPA8QgoARgeAHQgYAGgVAAQgOAAgNgDgADPLeIAFgGQANgTAEgqIABgOQgKArgNAmgAP4vWIgDihQgBhhgGg/QgIhNgUheQgMg5gdhwQgdhygRg6QgdhegihHQgKgVhoi3QhGh7gVhZQgThPAFhjQADhHAThtQAVh+AYhaQAShDAZggQASgWAZgMQAbgMAaAFQAeAGAVAcQATAaAFAhQAEAcgFAkQgCAOgLAxQgaB9gECAQgCBxAWBGQANAlAZAtIAuBNQCXD2BVEWQBWEWAOEfQAEBYgFBBQgGBSgVBDQgZBNguA7QgxBAhCAgQgxh2gHjAg");
	this.shape_2.setTransform(-100.6022,17.2015);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// top_face
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFC3C3").s().p("EBP7BoMQ3Njx94mAUgLYgCTgpcgIuQqiiOlpg/Qo/hlnVgjQydhYuIEoIgPAFQhjhEgugnQhVhGgjhJQgZg1gIhGQgFg0ADhOQAEh7ARhZQAWhyAvhWQAOgZBEhmQA0hNATg3QAXhFgChbQgBg5gPhrIgWiaIgYgPIpymRQhZg5gtghQhIg2gxg1QhWhegth+Qgsh7ABiDQACh/Arh+QAph5BLhtQA4hRBaheICiiiQL4rtEvswQBCiwA9jkIAWhVIgGivQgQjGh2kpIhijxQg3iNgchpQg0jAgEjIQgEjJAsjCQAGgaAmiMQAbhlALhCQALhHAGh8QAGiOAGg1QAKhdAgiRQArjDAIgqQAOhNAbjXQAXi5AZhqQAbh2A+irIBnkeQAihlA7jRQA7jQAihmQA8ixBJiLQgOgigJgkQg1jFBcihQBginDohhQBYglB9giIDag4QCCgiFehvQEthgC1gmQJNh6KZCBQJMByJkEvQHfDtJfGeQFdDuKyHrQHNE+MPHxQO2JbEuDIQPFJ/I2IeQL8LdFQMlQB3EfBTFSQBIEmAyFjQBLIbgBHiQgBIYhgHfQhWGxjBIFQh0E3kJJfQg4B/gpBIIAAAFQAECNgqEBQhZIchLK5QgPCIgYDxQlAg3nRhLg");
	this.shape_3.setTransform(407.4482,-203.7583);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// jaw
	this.instance = new lib.jawgirl("synched",0);
	this.instance.setTransform(361.2,355.3,1,1,0,0,0,558.5,185);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-292,-883.5,1399,1844.4);


(lib.bubble3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// small
	this.instance = new lib.big("synched",0);
	this.instance.setTransform(89.95,310.8,1,1,0,0,0,58.5,58);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(38).to({_off:false},0).wait(80).to({startPosition:80},0).to({_off:true},1).wait(118));

	// your
	this.instance_1 = new lib.your("synched",0);
	this.instance_1.setTransform(-111.35,160.5,1,1,0,0,0,-62.6,37.8);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(22).to({_off:false},0).wait(96).to({startPosition:96},0).to({_off:true},1).wait(118));

	// head
	this.instance_2 = new lib.heart("synched",0);
	this.instance_2.setTransform(230.25,175.65,1,1,0,0,0,78.2,83.1);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(11).to({_off:false},0).wait(107).to({startPosition:107},0).to({_off:true},1).wait(118));

	// bubble
	this.instance_3 = new lib.speechbubble("synched",0);
	this.instance_3.setTransform(242.55,240.05,1,1,0,0,0,259.2,176.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(118).to({startPosition:0},0).to({_off:true},1).wait(118));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.6,0,518.4,417);


(lib.bubble2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// but
	this.instance = new lib.but("synched",0);
	this.instance.setTransform(230.25,163.05,1,1,0,0,0,78.2,83.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(11).to({_off:false},0).wait(16).to({startPosition:16},0).to({_off:true},1).wait(50));

	// bubble
	this.instance_1 = new lib.speechbubble2("synched",0);
	this.instance_1.setTransform(242.55,240.05,1,1,0,0,0,259.2,176.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(27).to({startPosition:0},0).to({_off:true},1).wait(50));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.6,0,625.6,350.3);


(lib.bubble1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// small
	this.instance = new lib.small("synched",0);
	this.instance.setTransform(89.95,310.8,1,1,0,0,0,58.5,58);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(38).to({_off:false},0).wait(34).to({startPosition:34},0).to({_off:true},1).wait(5));

	// your
	this.instance_1 = new lib.your("synched",0);
	this.instance_1.setTransform(-111.35,160.5,1,1,0,0,0,-62.6,37.8);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(22).to({_off:false},0).wait(50).to({startPosition:50},0).to({_off:true},1).wait(5));

	// head
	this.instance_2 = new lib.head("synched",0);
	this.instance_2.setTransform(230.25,163.05,1,1,0,0,0,78.2,83.1);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(11).to({_off:false},0).wait(61).to({startPosition:61},0).to({_off:true},1).wait(5));

	// bubble
	this.instance_3 = new lib.speechbubble("synched",0);
	this.instance_3.setTransform(242.55,240.05,1,1,0,0,0,259.2,176.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(72).to({startPosition:0},0).to({_off:true},1).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.6,0,518.4,417);


(lib.righteye2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// eyeliner
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AABBlIgagMQgHgEgGACQgCABgDAEIgGAFQgFADgJgCIgQgDIgIABIgJACQgIAAgJgHIgQgKQgEgCgQgCIgtgFQgkgEgOgFQgSgIgHgBQgOAAgHgCQgEgBgFgFIgJgGQgFgDgJgCIgOgDQgPgEgWgQQgJgGgFgGIgIAAQgRgDgigCQgjgCgRgDIg4gMQgigIgXgBIgOAAQgIgBgGgCQgHgDgEgFQgFgGABgHQABgGAEgDIAAgBIAAAAQAHgGAPgCQAbgEApAHIAWAEIAYABQAKAEAaAFIAlACQAjABARACQAUADAdAHIAwAMIAyALQB2AVBJAGQCaANCVgdQAUgIAagJIArgSQAfgFAkgLQAhgKAUgJQAYgMAPgQIAEAAIAHADIADgBQADAAAFAFIAJAFIAQAGIASAFQAKADAGAAIAKACIAGACIAFAAIAagBIAIgCQAIgBAFAEQAHAFgDAIQgCAEgGADQgGAEgHAAIgTABIgUgBIgDAAIADACQAFAGgEAKQgDAJgJAEQgOAGgUgKQABAIgIAIQgKAHgEAEIgFAGIgHAFQgEADgSAAQgOAAgdANQgbANgQgBQABAKgMAFQgOADgGACQgLAHgGACQgGACgIAAIgPgCQgMgBgGAEIgFAEIgGAFQgHAEgPgBQgRgBgHADIgNAIQgHADgJAAIgRgDQgOgCgMABIgUAFQgaAGgbgHQgQgFgGACIgMAHQgGACgKgCQgMgCgEAAIgRAFIgGAAQgJAAgMgFg");
	this.shape.setTransform(65.4256,53.9204);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAoBWQgKgKgFABQgCABgGAGQgGAFgIABQgHABgGgEQgJgFgCAAIgIADQgVAJgjgaQgEAGgIACQgIACgIgCQgLgCgQgNQgMAKgSgFQgOgEgOgLQgIAGgLAAQgKAAgIgFIgKgKQgGgHgEgCIgTgIQgPgJgJgCQgUACgIgFQgDgCgCgDQgpgGgagFIhHgRQgpgKgfAAIghABQgTAAgNgCQgOgBAAgIQAAgFADgDIAAgBIACAAIAHgDQAXgIAsgDQBAgFAhAJIAlALQANADAZADQBAAJCAALIBlAJIBSAGQAuADAkgBQAugCA4gJQAigFBEgNIBNgPQBKgNAmgQQAPgHAGgBQANgEAJADIACAAQAEgEAFAAQAFgBAGADIAFACIAHgBIAKABIATAAIAQAFQAIAEAEAEQAEAEABAGQACAHgDAFQgEAMgMABQABAGgEAHQgDAHgHAEQgMAIgSgFQABAKgKAHIgTAJQgQAIgGABIgMABIgLABQgHABgJAEIgQAIQgYAMgdgEQgTgCgEAAQgHABgRAJQgKAGgJADQgOAFgPgBQgPgBgNgIQgQAUgTAEQgYAGgRgOQgCAJgMADQgIACgNgDQgTgDgKACQgFABgIAEIgOAFQgIADgHgCQgIgCgEgFQgJAIgNAAQgOAAgJgIg");
	this.shape_1.setTransform(62.2022,52.0708);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgMA1QgEgDgGgJIgEgFIgTgBIgGABIgWgBIgRAEQgKADgHgDIgHgGQhwgGhegMQgtgGgOgBQgqAAgUgCIg5gKQgggEgoAGQgMABgEgCQgEgBgCgDQgDgEABgEQAAgCADgDQgHAAAAgBIAJAAIAGgEQAdgMAqgBQAQAAA6AEQAbACBfAEIBgACQDfAGBwABQAsAAAVgCQAVgCAogIQAngHA2AAIBeAAQAtAAAYgHIAhgKQAUgDANAJQAEADACAEQAHgCAHACQAOAFACANQABAIgHANQgKAPgMACIgKACIgKAIQgKAJgTAAQgUgCgKABQgFAJgMACQgMABgIgHQgLAJgZgHIg3gOQADAFgDAGQgDAFgGADQgIAEgPgCIgrgEQgPgBgKgDIgHABIgNACIgKAGIgKAFQgNAFgYgNQgNAPgagHQgNgDgDABIgNADQgRADgagSIgDAAQgDAFgHAEQgHAEgIABQgJAAgVgHQgEAIgKADIgFABQgGAAgFgEg");
	this.shape_2.setTransform(60.3563,48.3169);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AA/AsQgNgDgYgPQgKALgQABQgRAAgLgKQgIAEgJAAQgKgBgHgFQgGAIgMgDQgMgEgHgBIgIgBIgBAAQgYABgSgBIgmgEIglgEQgXgCgggBIg2AAQhqgBhsgRQgTgDgKgFQgLAAAAgBIAJAAIACAAQAMgHAZgEQA2gHBGgCIB8gBQA1AAAjADIA6AGQATABAbgDIAtgFQBkgMC6AFQDIAEBYgHQAegDAOAGQALAFAHAKQAGALgEAKIgCADIABABQAGAHABAJQABAKgGAGQgJAKgSgGIgbgNQgEAGgHADQgHACgHgCIgHgEIgIgCQgEAAgGACQgHADgEgBQgDAAgHgDQgHgEgEAAIgIACQgGADgCAAIgJgCIgIgCQgEgBgOAFQgLAEgbAAQgbgBgNgCIgQgBQgLAEgGAAQgHAAgLgHQgMgIgGgBQAAAIgHAHQgGAFgJABQgLABgWgLQgEAGgHADQgIADgHgCIgRgFQgDAAgIADQgLAEgLgBQgMgCgIgIQgFAJgKAEQgGACgHAAIgIAAg");
	this.shape_3.setTransform(59.2321,47.1864);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AIkArQgGAAgTgGIAAAAQgJACgIgBQgPgHgJABQgEABgIAEQgJAFgEAAQgIABgHgGQgGgFAAgGIgTgBIgBAAIgEAAIg1gBIg/AAIgJACIgWAGQgKADgHgCQgHgDgCgHIg4AAIgGAEQgHAEgIgEIgGgEIgJAAQgFAGgIAAQgKAAgGgGIgxAAIgCABIgSAAQgFAAgIAEIgNAFQgHABgHgEQgEgDgBgEIguAAIgGAFQgHADgHgDQgFgCgCgDIhxABQg5ABgTACIg3AHQgaADgkAAQheAAhNgIQgLgBgFgDQgJgFACgJIgFAAIgJAAIAPgBQADgJASAAIBsACQA+AAAsgGIBAgMQAegFBIgCIA6gBIACgDQAJgHAMAAQAMABAGAIIADAAIAFAAIAxgBIAHgDIAIgIQAFgEAEgCQAKgDAPALIAGAGIAsAAIABgCQAHgGAGgDQAIgEAIACQAJACADAIQAEgDAIACIANADQAFAAAKgDQAGAAAFAEIA0AAIACgCQAJgHAFgBIAIACQAFADACAAQAEAAAGgCIAKgCQAFAAAEADQADACACAEIABAAIAigBIAJgFQANgHAIgBQAOgBAFALQAFgFAMAAQARABADgBIAQgEQAIgBAFAIIADAGIAOAAQASABAKAEIABAAIAOACIATgGQAKgBAOAHQAIADAEAEQAJACAEAGQADAFABAEIABADQAEAJgCAKQgDAJgIAFQgHAFgKAAIgHgBg");
	this.shape_4.setTransform(58.6731,45.8842);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AHlA7IglgJQgpgKhigOIh7gPQhNgIh5AFIimAJIhiAHQhiAGgxABQhRABhAgKQgRgCgCgKIAAgDIgEAAIABAAIgBgBIAEAAQAAgEAFgCQAGgFAIgBQAMgBAfAEQA7AGBugOICRgTIBngNQAbgMAOAAIANABQAIAAAFgBQAGgBAMgFQAJgCASADIAgAFQAXAEANgBQAIAAASgEQARgEAJABIATACQALABAHgBIAMgCQAHgCAFABQAHABAEAEQAFAFgBAFIABAAIADABQA6gBAeABQAzACAoAJQAJADAJAAIASgFQAXgIAXAFIAeAIIAUADQAKABAPAHQARAHAHACQARAFADACQAGADABAIQACAIgEAGQgGAKgSADIgBAGQgEAHgHAFQgLAJgTABIgGAAQgOAAgSgEg");
	this.shape_5.setTransform(59.3705,45.8441);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AIVBRQgSgDgbgLIgrgTQgXgIgtgGQgxgFgUgGIg2gRIgFgBIgjgDQgpgCg0AAQgoAAgrABQgrAEgqACIgPABQgiACgzAFIhdAJQhRAIg4AHIhAAHIg8AEQgrAAgYgCQgJAAAAgBIAAgBIAAAAQAAgBAOgBIAVgCQgIgDABgEQAAgGAKgDICQgeIBMgMQACgCAEgCQAFgDAQAAQAOABAHgFIAHgGQAEgEAEAAQADAAAHADQAGADAEAAQAHAAAMgJQAEgCAIABIANAAQADgBAOgHQALgFAHABIAGADQAEACADgBIAJgEQAEgCAHADIAKAFQAJACANgIQAQgJAFgBQAHgBAQADIAZAHQAIgGATgCQATgDAJgFIAIgGQAFgDAEgBQAIgCAJAFIAPAKQAGAFAGAAIAKgGQALgHAMAEIAJAEQAFABAEgBQAEgCAHgHQAIgFALAIQAPAKAEABQAFABAIgDIANgEQAIgCAHABQAHACACAHQAFgHAIgBQAJgBAGAFIAFAGIAFAFQAGADAMgCQAOgEAEABQAHAAAOAFIANAAQAHAAAFABQAGABAFAEQAFAFgBAFQALgCALAIQAGAGACAHIARADQAIgBAIADQAHACAHADIAnAPQAaALARADIARADQAKACAFAFQAIAGABALQACAKgGAJQgKAMgUAAIgLgBg");
	this.shape_6.setTransform(58.04,41.3875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AHfBQQgLgFgPgLIgFgDIhUgbQgngNgbgGQgqgLgtgDQgpgEg0ABQguAAgyADQgpACgvAGQghAEg0AIIhdANIgUACIhMAOIg+AKQgdAGgRABIgNAAIgtADQgrACgYgDQgJgCAAgBIAAAAIAAgBQAAgBAOgCIAOgCQgHgFACgIQACgGAJgDQAGgCAQABIATAAIAEAAIACgCQAPgLAmgIIC9gmQAAgEADgEQAEgFANgCQAXgEAwgCQAXgCAOAEIAKgBQAEgHAIgFQAJgFAKABQABgIAHgFQAHgEAHACIAIADIAIADIAMgDQAJgCAKACQAJADAGAHQANgNAKgDQAQgEAKAJQANgOALgBQAIgBAGAFQAHAEABAHQAKgNAPgBIAKgBIAKAAIALgDQAGgBAFAAQAHABAFAGQAFAFAAAHQAVgKAMAEIALAHQAHAFAFABQAFACAIgCIANgDQAHgBAHADQAHADAAAGQALgBAHACQALAEAAAIQAMgDAXADQAYADAKgCIAMgEQAGgCAFABQAHABADAFQAFAGgEAFQATgCARAXIACAEQANAFALAIIAUAOQAMAIAKADQAIACAOAAIAVACQALACAIAHQAKAHgBAKQAAAOgOAHQgKAFgQABIgKABQgfAAgXgLg");
	this.shape_7.setTransform(58.5888,38.9075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AH2BfIgVgMIgXgJIhXgkIgNgGIgbgIQhAgRgZgEQgpgGg6gBIhjAAIghAAQghAEglAFQghAEg0AKIhdARIhIAOQhSAVgzAPQgVAHgNACQgTADgOgFQgOAFgPABQgNABgHgHQgEgFABgFIgFgBQgKgCABgCQgBgCAPgCIADAAQADgGAJgCIAIgBIAJAAQADgBALgFQAJgFAGABIAAAAIABAAIAxgQQBrgjA2gNIAJgCQgBgEAFgFQAFgFAHgBQAKgCAWABQAUABALgDQAJgDAPgKQAPgKAIgDQAJgEAUgCQAVgCAKgDIABgBIACgHQADgHAFgEQALgIAPAHIAIAGIACABQAFgBAGABQAGACAEADIAEAAIAAAAIACgCIABgCIAAgGQgBgGAFgFQAFgFAGAAQAFAAAEAFQAEAFAAAGQAFgMAEgFQAJgIAJABQALACAFAPIACAKIAVgHQAQgCAEALQAPgNAIgCIAAAAIABAAQAEgHADgCQAGgGAJADQAKACADAIIABAEIADAAQALABAEAKIACAAQALgJANADIAOADQAEAAAHgDIAKgCQANACAEAQQAQgGAIABQAHABAFAEQAGAEAAAGQAPgCAHACQANADAEALQAhAIAmABQAYABADANQALACAMAKQAIAGAMAMQAIAKACAIIAOAIQAVAMAsAdQAPALgBAJQAAAIgIAEQgHAEgJAAIgCAAQgVAAgbgOg");
	this.shape_8.setTransform(57.8964,37.1146);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AIbCCQgWgCgNgIQgHgFgJgJIgHgIIgWgLIhXguQgngWgbgKQgSgHgTgEIgKgEQgZgHgQgBIgMABIgCgCIAAAAQgkgFgqABQguAAgyAGQgpAEgvAJQghAFg0ANIhVAUIibArQgQAFgIgBIgFAAIgaAGIgIACIAAAAQgMAHgFABQgKADgJgDIgFgDIgLACQgrACgYgFQgJgDAAgCQgBgDAPgCIA9gOIAKgCIAFgDIAJgCIAMgEQAigTAHgDQAJgEAHABIAEgDQALgFATgFIACgBQADgDAOgFIAggIQgBgFACgEQAEgMANgCIASABIARACIAAAAIAFgEIAPgIIALgEQAGgCAEgDIAHgKQAFgGAEAAQADgBAFACIAHADQAGABAHgBIASgCIAAgFQABgHAIgEQAHgEAGAEQACgHAIgDQAIgEAHAEQAFADACgBQAEAAACgFIAEgJQAFgFAJACIAPAEQADABASgEQAPgEAOADQAHABACgCQAEgCACgIQAEgGAIABIAPADQAGABANgCQAMgBAHACIALgCIADAAIAAgLQADgKAJgEQAKgDAHAHIAKAJQADADAKAAQAKABADAEIABABIAEABIAUABIAAAAIAGgFQAFgDAIgBIANgBIAOgCQAIgBAFADQAFADAGAHIAFAEIACAAQAOABALAGIAEADQANAEAFACIAPALQAJAHAIACQAHABAOAAQAJACASAJIAYAHQAPAGABAMQAZAOAcAJQAWAFAFAKQABAEABAKIASAPIApAiIAIAJIADACQASAMgBALIgBACIgBAHQgDAHgFADQgHAFgLAAIgIgBg");
	this.shape_9.setTransform(57.7976,35.2167);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AIoCPQgEgCgKgLIgCgCQgJACgJgDQgJgEgNgMIgEgEIgLgFIgigWIhWg4IgbgSIg4gdQgjgPgjgHQgqgIgzABQgvgBgxAIQgpAFgvAMQgiAIgzAQIhdAaQhRAXg5AVIgpANIgWAHIgBAAQgfAHgeAEQgrAEgYgIQgJgDABgCQgBgEAPgEQAcgGAhgKIA5gTIAUgHIAYgNIAQgJQACgMARgEIAOgCQAJgCAFgDQAFgCAGgGIAKgJQAKgHAVgIQAWgIAJgBQAPgBAFgDIAIgIQAFgEADgCQAEgBAJABQAHABAEgDQADgBADgGIAGgIQAFgDAKABQAMACAEgCQADAAAGgEQAFgDADgBQAFgBAMACQAIgBANgJQAEgBAJgBIANgCQAFgBAOgHQALgGAHAAQADAAAKADQAIADAEgBQAHgBAKgIQAKgFASACQAXACAHgBQAHgBAPgFQAOgEAJAEIALAEQADgBAEgDIAGgHQAFgGAJAAQAIgBAHAFIAGAGQAEADAEABQAEAAAEgDIAGgFQAKgGAMAEQAMADAFALQAMgEALAIQAMAIAAANQANgFARAMIAOAKQAIAFAHABIAKAAIAKABQAJACANAPQAIAKAHABIAPgBQAHAAAHAEQAHAFADAHIADAIQACAEADACQADACAEABIAHABQAIABAIAJIAGAHIAPAIIAgAXIASADQALAEAEAIQABAEgCAEIAMALQALAMACAMQAMAHAGAIQAKAMgEAOQgDAKgKAEQgFACgEAAQgGAAgFgDg");
	this.shape_10.setTransform(58.929,34.9738);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AIuCjQgJgDgOgMIgNgDQgWgIgUgNIgigZIhWhFQgbgWgUgNIgCgBIgxgaIgVgKQgRgGgRgFIgQgDQgTgCgcAAQg9AAgvACIgSADQgpAHgvAOQgiAJgzATIhdAgIgoAOIgXAJQghANgVALIgWALIgWALQgZALg2AJQgiAHgVgBQgJgBgEgDQgNgBgJgEQgJgDABgEQgBgEAPgEQAcgIAhgMIA5gXIAagLQAAgDACgFQAEgIAIgEQAGgEAKgCIAQgDQAPgFAUgOIAQgKQAPgLALgBIALAAQAHAAAEgBQAEgCAFgFQAGgGADgBIAKgCQAHAAADgCIAIgGQAEgFADgCQADgCAHgBIAJgEQAFgCAIgLQAIgJAGgCIALAAQAHABAEgBIAHgGIAIgGQADgCAIgBIALgDQADgBAFgGIAHgHQAFgDAJAAIAPABQAKgBATgGIAngCQAWAAAMgJIAQgMQALgFALAGQAHAEADAHQAFgFAKgFQAbgPAQAGIAIAEIAIADQAFABAHgDIALgGQAQgHAPAJIAKAHIALAGQADABAPAAQALABAFAFIAFAHQACAEADACQADADAMABQAMACAJAIQAKAIABALQALgEANAFQAMAFAFALQAFAKACACQAEADAGgBIALAAQANgBALAJQALAKABANQAKgDAKAEQAKAEAGAIIAHANQACADAOAHQAKAHgBAJQAJgCAIAIIAMAOQAGAFAOAGQAOAFAGAGQAFAGADAMIAHATQAEAJAMARQAKASgJALQgGAIgKAAIgJgBg");
	this.shape_11.setTransform(59.0368,32.2852);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AIzCyQgHgBgKgIIgBAAQgFACgEAAQgJgBgLgEQgVgJgUgQQgNgKgUgTIhWhRQgngmgbgSQgpgdgtgMQgpgMg0ABQgugBgyALQgoAIgwARQghALg1AWIhdAlQhRAig5AdQgxAWgQAHQgfAKgeAFQgqAFgZgKQgJgEABgEQgBgFAPgGQAcgIAhgOIA6gbIBagrIAwgWIAFgGQAJgFADgFQADgDACgHQAFgIANgBIAVAAIAMgCIAMgJIAFgDIADgEIAKgPQANgPASAFQABgIAHgGQAHgGAJAAQABgHAGgFQAHgFAGABIANABQADgBAEgEIAHgGQAEgDAIgBIANgBQAJgBAKgGIAegQQARgIAOAAIAQACQALABAGgBIANgFQAHgDAGAAIAKADQAGADAEgBQAGAAALgGQAHgDAHAEQAHADADAGQAIABAKgEIARgIQAWgMAMAJIAMAJQADABAIAAIAsAAQAUgBAKAHQAGAFABAJQABAJgHAEQAHADAMAAIAUACQALACAHAHQAIAIgCAJQAVAFAJAIQAHAGACAIQADAJgEAHQAGAEAKACIARAFQAKADAGAGQAGAHAAAIQARAJAXAPQASANABALIAAAHQAOANALAMQANgCALANQAIAJAGASQACAIACADIAGAIIAJALIAJAJQAFAFACAFQAGAOgKALQgHAJgLAAIgFgBg");
	this.shape_12.setTransform(59.5773,30.1175);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AIqC+IgKgDIgCABQgEACgFAAQgJgBgLgFQgVgKgUgSQgNgLgUgWIhVhcQgngrgbgVQgoghgtgOQgqgNgzABQgvAAgxAMQgpAJgwATQghAMg1AZIhdArQhRAng6AgQgwAagRAHQgeAMgeAFQgrAGgYgMQgJgEAAgFQAAgFAPgHQAcgKAhgQIA5geIBNgqIABAAQADgEAGgDIAKgHIAHgFQAFgDAEgBIAGABIALgFIABgHQAAgNAQgGQAHgDAUgBQAKgBAKgDIAYgMIABgFIAAgGQABgLARgDIAMgCQAHgCAEgDQAFgEAGgSQAEgQAKgDQAGgCANAGQAMAFAHgCIAIgFIAGgIQAJgIANgBQANgCAJAHIAVgQIAJgFQAGgLASgBIAPgBIAOgBQAMgDAWgLQAKgDAJACQAKADADAJQAhgXAoADQAZACACAQQAUgKAMABQAJAAAHAFQAIAGAAAIQAIACALgBIATgCQAYgDAMAKQAIAGABALQABALgIAEQAJAEAaAAQAYABAKAJQAGAGABAKQAAAKgHAEQAMAAAJAJQAJAKgBAMQAGAIASAEQAUAEAGAFQAIAFABALQABAKgGAFIABABIADACQAHADAMADQARADAGAHQAFAGAAAJQAAAGgDAFQANAPANATIAFAEIANAHQAIAEAEAEQAGAHAAAKQgBAJgGAHQASAEAJAHQAOALgCAOQgCAMgNAGQgIADgJAAIgJgBg");
	this.shape_13.setTransform(59.8876,28.2353);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AISDPQgJgBgLgFQgWgMgVgUQgNgNgWgZIhahpQgpgwgcgYQgqgmgugQQgqgPgzABQgvABgwANQgpALgvAVQghAOgzAcIhbAxQhPAsg4AkQgvAfgQAHQgeAOgeAFQgqAIgZgOQgJgFAAgFQgBgGAPgIQAbgLAggTIA4giIA7glIgBgBQgCgHADgEQAFgHAQgBIAMgBIAMgHIgDgDQgFgKAFgIQAEgFAJgBIAPgBQANAAANgDIAbgQIABgHQADgFAOgEQAJgCAJgEIARgJIAEgCQgEgGADgHQADgHAHgEQAGgDAIgBIAPgCQAFgBADgCIACgFIABgFQACgHAHgFQAHgEAHAAQAKAAATAHQAHgUAJgGQAHgEAJACQAJADAAAIQAbgGAUgUIANgNQAIgGAHACQAIABADAIQACAFAAAFIAIgCQALgFAHgJIAKgKQAGgGAFgBQAHgCAUAHQAeAKAbgJQANgGAFAAQAJgBAHAHQAHAHAAAIQAlgLARAMQADACAJALQAHAJAHADQAFACAIgBIAPgCQATgDAHAKQAHAJgIATQAXABAYAGQAOAEAFAHQAFAGgBAKQgCAJgHAEQAFAGAWAHQAVAHAAAOQABAEgDAGIgEAJQAXgDAMgBQATAAAGAIQAEAEAAAIQAAAGgEAFQgDAHgPALQgBAAgBAAQAAABgBAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABABAAQAAABABAAQAAAAABAAQAFADAJAAIAPAAQAUgBAHALQAEAHgDAJQgEAJgHAFQAJAPAIAHQAIAIAGACQAFACAQgBQANAAAGAEQAFAEACAHQACAGgCAGQgEAMgMAHQAFAGAMAAQAOgBAFADQAGACACAHQADAHgCAHQgFAOgPAEQgLAEgQgCIgJgCQgDAFgDACQgEACgFAAIAAAAg");
	this.shape_14.setTransform(60.244,26.5278);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AIFDsQgIAAgMgGQgWgNgVgXQgNgOgWgcIhch0Qgrg1gcgbQgrgqgugSQgqgQgzABQgvAAgwAPQgpAMgvAXQggARgyAeIhaA2QhOAyg4AoQguAhgRAJQgdAPgeAGQgqAIgagPQgJgFAAgGQAAgHAOgIQAbgNAggVIA3gmIAegUQgBgHAEgGQAFgIAJgEIAQgFQALgDAGgDQgRgQAHgMQAEgHAPgDQAMgCAWABIAOAAIANgJIAAgHQACgKAIgFQAKgHAVABIAdgTQgCgHACgJQADgIAIgEQAIgFAIADIAIAFIADACIAUgLQgEgXALgKQAEgEAHgBQAHgBAFACQAKAFACAJIAJgEQAIgLAEgNIAFgOQAEgHAFgEQAFgEAIABQAIABAFAGQAIAIgBALIABgBIAfgLIACgIIADgOQAEgSALgFQAMgFALAKQAIAJgBANIAFACIANgDIAGgEQAGgHAIgRQAJgPANAAQAHgBAGAGQAFAFACAHQABAJADADQADADAIgBQAbgDAJgKIAIgKQAEgGAEgCQAHgFAIADQAJACAFAGQAKAOgGASQAEgBAKABQAJABAFgCQAGgDAIgLQAGgFAKABQAJABAGAHQALAPgPAbIgCACIAMAGQAFgCALgDIASgLQAKgHAJAAQAJAAAFAGQAMAMgIASQgDAJgPARIAMAKIABAAQAGgEAKAAQAHgGAJgCQAIgBAIADQAIAEADAGQAGALgFAOQgDAGgKAQQAHABAJgBIARgDQAVgDAJALQAKALgIAPQgGALgNAIQAHABAKgBIAQgCQAVgEAJALQAJAKgGAOQgFAKgOAIQAHAJAPgEIAMgDQAGgCAFAAQALABAHAKQAGAJgDAKQgEAMgTAMQAGALAMAGQAMAFAMgBIARgEQAKgCAGACQAIACAFAIQAFAHgBAIQAAAPgOAOQgHAHgUAMQAIAAALgEIASgHQAKgDAJACQALADADAIQAFAMgLAMQgFAGgRAHQggANgWAAIgBAAIgEADQgEACgEAAIgBAAg");
	this.shape_15.setTransform(61.4773,23.5804);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AHxD/QgJAAgMgHQgWgOgVgZQgNgPgWgfIhch+Qgrg6gcgdQgrgtgugUQgqgSgzABQgvABgwAPQgpAOgvAZQggASgyAhIhaA7QhOA2g4ArQguAlgRAJQgdAQgeAHQgqAJgagQQgJgGAAgHQAAgHAOgJQAbgOAggWIA3gqIAQgMIAAAAQgDgSAQgNQAMgLATgCQgCgeANgKQAJgIAUACQAZACAHgCQgEgfAPgIQAIgFAQAEIAQAEIAKgHQABgVAOgOQAJgIAMgBQAMAAAIAGIAEgDQACgFAAgIQAAgOABgEQADgLALgFQAKgFAKAFIAHAFQAFACADABQALACAIgOIAIgWQAEgLAHgHQAIgIAKgBQASgDANATQAIgEAIgRQAHgQAIgEQAHgEAKACQAIADAHAHIAJAJQAGAFAFAAQAFgBAHgGQAHgIALgQQAKgOAPAAQAJABAGAIQAGAIAAAJQAFgBAKAFIAFADIAPAAQAFgCAEgGIAKgRQAHgJAMgDQANgDAJAHQAEAEAEAHIAFAMQAHAPAMACQAFgDAMgPQAKgMAJAAQAKABAFAKQAFAKgBALIgDAUQgBAKABAHIAFADQAMABAQgMQAUgRAJgDQAJgDAJACQAKADADAHQAFALgMAVIgTAgQAXgCAVgKQAOgHAHgCQAMgDAIAFQAKAGABAOQACAUgXAhQAMgMAIgEQAOgGAKAHQAJAGAAAMQAAALgFAMQgIAVgOAVIApgPQASgHAKAEQAJAEAEAJQAEAIgCAKQgCAOgPATQALAFAWgIQAXgGAKAIQAJAIgCAOQgBAJgIAMQgTAZgcAKQAeADAwgJQARgDAIAEQAJAGABANQAAAMgHAKQgFAGgLALQgLAKgEAGQAJABANgEIAWgIQAMgEALADQANADAEAKQAFANgNANQgIAIgRAGQgkANgXAAQgOgBgNgEQgDALgHAEQgDACgFAAIAAAAg");
	this.shape_16.setTransform(63.5559,21.7197);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},9).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).wait(76));

	// eyelid
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFC3C3").s().p("AgyFGQgZAAgTgFQgQgDgZgJIgpgNQgagIg2gIIhmgOQgZgEgOgFQgTgGgKgNIgXgEIgJgDIgVAAQgbABgLgCQgVgCgMgLIgCgBIgEgDIgKgCQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgHADgFIgBgIQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagLASgKIBCgnQAagOBCgbQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmAsQAgAjgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFASgLATIgDAIQgLAYgiAGQgMACgQgCQgQAYgnALQgaAIgvAEQgKANgXALQgkARgwAGQgfAEg5ABIjTAEIgbABIgSgBg");
	this.shape_17.setTransform(60.4811,23.7152);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFC3C3").s().p("AA4E7Qg6gBhzgUQi/gihngJQgagCgMgDIgJgDIgVAAQgbABgLgCQgVgCgMgLIgCgBIgEgDIgKgCQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgJIBCgnQAagOBCgcQgCgGABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmAsQAgAjgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFASgLASIgDAJQgLAYgiAGQgMACgQgDQgQAZgnALQgcAIgyAEQg5AFgWAEQgnALgUADQgRADgXABIgnAAIhCAEQgjACgXAAIgJAAg");
	this.shape_18.setTransform(60.4811,22.5318);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFC3C3").s().p("AgaEhQg5gBhwgPIhGgJQgzABgmgDIgVADQgVACgfABIg0AAQgbABgLgCQgVgCgMgLIgCgBIgEgDIgKgCQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgGADgGIgBgIQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgKIBCgmQAagOBCgbQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmArQAgAkgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAYgiAGQgQADgYgFQgOAGgTABQgPABgPgCIgMAAIgCAAIgFAAIhAAAIgRAGQgXAJgRAEQgZAGguAAIhpgEIhXACQgwADgcAAIgLgBg");
	this.shape_19.setTransform(60.4811,20.0068);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFC3C3").s().p("AA2EaQh+gMhAgCIh2ABQg6AAgqgDIgVADQgVADgfAAIg0ABQgbAAgLgBQgVgDgMgLIgCgBIgEgDIgKgBQgOgEgKgJQgGgGgDgGQgIgFgFgHQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgmQAagOBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAACIAWAMQAfAVAmArQAgAkgCAaIgCAGIABABIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAZgiAFQgQADgYgFQgOAGgTACQgPAAgPgCIgMAAIgCAAIgFAAIhQAAIguAAQgPABg8AJQguAHg7AAQgoAAgtgDg");
	this.shape_20.setTransform(60.4811,19.5877);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFC3C3").s().p("AoFEWQgVgDgMgLIgCgBIgEgDIgKgBQgOgEgKgJQgGgFgDgHQgIgEgFgIQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgmQAagOBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAADIAWALQAfAVAmArQAgAkgCAaIgCAHIABAAIAGAHQAPANAMAFQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAZgiAFQgQADgYgFQgOAHgTABQgPABgPgDIgMAAIgCAAIgFAAIjKAAQhBAAghgBIhFgFIhBADQgyABhTgDIgegBIhbACQg4ABgjgBIgpAFQgVADgfAAIg0ABIgNAAQgRAAgIgBg");
	this.shape_21.setTransform(60.4811,18.9589);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFC3C3").s().p("AG3ENIgYgLIgggDQhOgIg0gDQgzgChUAAQhnABgggBIg7gCQghAAgZADIg8AJQgmAGgzABIhKAAQgaACggAAIgHAAIgQACQgwALgZAAQgUAAgQgHIgJgFIgKgCQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgHADgFIgBgIQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgKIBCgmQAagOBCgbQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmArQAgAkgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAYgiAGQgQADgYgFQgOAGgTABIgIABQgYAAgXgJg");
	this.shape_22.setTransform(60.4811,18.8125);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFC3C3").s().p("AG3ENIgagMIgagMQgVgIgggDIg3gDIgqgFIgqgFQgkgEgrAAQhhgBiwASQg8AGgfAEQgzAJgaADQglAEg1ABIhHABIgIADQgMADgKgBQgLAAgJgFIAAAAIgGgBQgMACgMgDQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgHADgFIgBgIQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgKIBCgmQAagOBCgbQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmArQAgAkgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAYgiAGQgQADgYgFQgOAGgTABIgIABQgYAAgXgJg");
	this.shape_23.setTransform(60.4811,18.8125);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFC3C3").s().p("AIAEMQgagHgwgUQgygVgYgHQgPgFgygLIgCAAQhagGgVgDIgUgDIhwABQhHABgYACQglADhIAMIkXAvQgeAFgOAEIgVAHQgMADgKAAQgMgBgKgGIgBAAQgNADgOgDQgOgEgKgJQgGgFgDgHQgIgFgFgHQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgmQAagOBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAADIAWALQAfAVAmArQAgAkgCAaIgCAHIABAAIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAZgiAFIgMABQgSAAgZgHg");
	this.shape_24.setTransform(60.4811,18.5748);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFC3C3").s().p("AIiENQgPgEgNgIQgMADgMgDQgPgDgWgRIAAAAIgggHQgrgIgXgNIgVgMQgIgEgXgGQjMgribAYIhlAUQhZAShaAKQg0AHgUAGIggAMQgTAHgNACQgcADgNAEQgUAIgKADQgNADgOgDQgOgEgKgJQgGgGgDgGQgIgFgFgHQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgnQAagNBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAACIAWAMQAfAVAmArQAgAkgCAaIgCAGIABABIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLATQgLASgTAHQgLADgMAAQgIAAgIgBg");
	this.shape_25.setTransform(60.4808,18.0947);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFC3C3").s().p("AIiENQgPgEgNgIQgMADgMgDQgPgDgWgRQgwgjgdgOQghgRgtgLQgdgHg2gKQg4gJgXgCQgqgDhCAHQhLAIhCAMQg5AKhPARIhFAQIhoAdQg+ARgrAGQgSACgOgBQgMABgLgCQgXgEgLgQQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgnQAagNBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAACIAWAMQAfAVAmArQAgAkgCAaIgCAGIABABIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLATQgLASgTAHQgLADgMAAQgIAAgIgBg");
	this.shape_26.setTransform(60.4808,18.0947);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFC3C3").s().p("AIiENQgUgFgPgNIgMgLIgMgJQgHgFgMgEIgTgIQgPgHgTgQIgBgBQgGgDgIgIIgNgMIgbgWQgVgNgqgOQglgNgZgEQgRgCgeAAIgvABQgLgBgzgHQgmgFgYADQgUADgdALIgwATQggALhEARIiFAgQg4ANgaAFIghAGQgTAEgNAFQgMAEgaANQgYALgOAEQgWAGgUgDQgXgEgLgQQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgnQAagNBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAACIAWAMQAfAVAmArQAgAkgCAaIgCAGIABABIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLATQgLASgTAHQgLADgMAAQgIAAgIgBg");
	this.shape_27.setTransform(60.4808,18.0947);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFC3C3").s().p("AoLD2QgSgJgGgVIgCgJQgCgIAAgJQAAgNAGgLQAJgPAdgQQAggSAigRIAsgUQAbgMARgKIBDgnQAZgOBCgaQgBgHAAgKQAAgMACgJQACgHAGgKIALgPIANgaQAIgQAGgJQALgPAYgTIBQg+QASgMAJgBQAOgDAKAMQAKAMgHAOQgDAGgOAKQgqAbglAeQglAegHAaQAWgMAfgMIA4gUQAhgMAPgLIAYgTQATgOAYgCQANgCALAEQANAFADAMQADAOgNAOIAagFQAVgEAGABQAHABAFAEQAFAFABAGQAWgEAbALIAvAWIAfANIAfAOQAjAUAKAcIABACIAVAMQAfATAnAsQAfAkgCAaIgBAHIABABQAYAZgCAaQAAANgHALQgHALgLAFQgLAGgNAAQgNAAgLgGQgGgEgIgHIgMgNIgkgdQgigigTgOQgkgag8gGQgUgCgfgBIg0gCQg4gEgSABQgVABgrAKQhEAQglALQgoAMgbAMQgoAXgVAKQgWALgvARQg2AUgYAHQgrANgkAGIgPACIgTAIQgRAHgOAAQgOAAgMgHg");
	this.shape_28.setTransform(53.9294,16.3152);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFC3C3").s().p("AoAD2QgSgJgGgVIgCgJQgCgIAAgJQAAgNAGgLQAJgPAdgQQAggSAigRIAsgUQAbgMARgKIBDgnQAZgOBCgaQgBgHAAgKQAAgMACgJQACgHAGgKIALgPIANgaQAIgQAGgJQALgPAYgTIBQg+QASgMAIgBQAPgDAKAMQAKAMgHAOQgDAGgOAKQgqAbglAeQglAegHAaQAWgMAfgMIA3gUQAigMAPgLIAYgTQATgOAYgCQANgCALAEQANAFADAMQADAOgNAOIAagFQAVgEAGABQAHABAFAEQAFAFABAGQAWgEAbALIAvAWIAfANIAfAOQAjAUAKAcIABACIAVAMQAfATAnAsQAfAkgCAaQgCAZgWAMQgWAMgWgKQgQgGgQgUQgQgXgKgKQgXgYgzgTQgsgSgggFQgagEg0AAQguAAgXADQgdADgtANQhTAXgrAUQgnAUgTAJIgvATQgfALgQAHQgnAWgUAJQgRAHgmANQglANgSAJIgaAOQgQAIgKAEQgRAHgOAAQgOAAgMgHg");
	this.shape_29.setTransform(52.831,16.3152);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFC3C3").s().p("Am3D2QgMgBgLgHQgLgHgFgLQgGgLAAgNQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgKIBCgnQAagOBCgaQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBOg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbgkAeQglAegIAaQAWgMAfgMIA3gUQAigMAPgLIAYgTQATgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIACAIIAEAJQAFAWgOASQgOASgXABQgMABgQgGIgbgLQgdgNgngHQgXgFgwgHQgegEgWAAQgRAAghAEQgfAFgfAHQg9APhvAwQg4AXgdAQQgjAXgSAKQgUALgxAVQgtAUgXAOIgiAVQgRAJgQAAIgEgBg");
	this.shape_30.setTransform(47.1526,15.7125);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFC3C3").s().p("Ak4CYQgLgCgHgLQgGgLAFgKQAFgLASgJQARgIATgIQgDgIAAgNQAAgLACgKQACgHAGgJIALgQIANgYQAIgRAGgIQALgQAYgSIBQg+QASgNAJgBQAPgCAKALQAKAMgHAOQgDAHgOAJQgrAbglAfQglAdgHAaQAWgNAfgKIA4gUQAigMAPgLIAYgUQASgNAYgDQANgBALAEQANAFADAMQADAOgNANIAagEQAVgFAGABQAHABAFAFQAFAEABAHQAWgEAbAKIAvAWIAfAMIAfAPQAjATAKAcQAFAMgCAMQgCANgMAEQgNAFgPgMQgNgPgIgGQgPgLgZgDIgsgBQgVgCg5gPQgxgNgeADQgOABgTAFIgiAJIguAIQgcAFgRAHQgMAFgSALIgeARQgMAFghAKQgdAJgPAIIgRAJQgIADgGAAIgDAAg");
	this.shape_31.setTransform(61.8071,6.2627);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFC3C3").s().p("AijB2QgIgIABgUQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgPAGgJQALgPAYgTIBPg+QARgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgpAbglAeQglAdgIAaQAWgMAggMIA2gTQAigMAPgLIAYgTQATgOAZgCQANgCAKAEQANAFADAMQAEAQgRAQQgNAKgYAKIgnARIgUALQgLAGgJADQgcAGgNAFIgjAPQgTAIgJAFIgPAKIgQALQgUAMgVADIgKABQgMAAgGgGg");
	this.shape_32.setTransform(51.3567,3.4436);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17}]}).to({state:[{t:this.shape_17}]},9).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).wait(77));

	// flare
	this.instance = new lib.eyeflare("synched",0);
	this.instance.setTransform(61,35.75,1,1,0,0,0,22.6,15.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(101));

	// pupil
	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgCBlQgVgBgUgJQgUgKgOgQQgOgRgGgVQgGgWAEgVQADgVANgTQANgTASgLQATgMAXgCQAVgDAVAHQAcAKATAYQATAYADAdQACAVgHAUQgHAVgPAQQgPAQgUAIQgTAIgUAAIgCAAg");
	this.shape_33.setTransform(61.4316,30.8064);

	this.timeline.addTween(cjs.Tween.get(this.shape_33).wait(101));

	// kashtit
	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#4083FF").s().p("AAhDYQgCgCgBgHIgGgqQgJgEgKAQQgKARgOANQgJAIgFgEQgDgDAAgGQgBgUADgRQgLATgRAMQgFADgDgBQgHgCAEgNIARgmQgfAXglAOQAKgaARgTQgMAAgQAGIgbAMQgFACgDgBQgEgDABgGQABgJANgOQAOgOABgJIg+AQQgKAEgCgHQgBgEAGgEQAbgRAhgKQgegIgLgJQgIgGACgFQACgFAHgBQASgDARAAIgogiQgIgGACgFQADgEAIAAQAagDAWgIQgcgKghgRQgLgIAFgFQADgDAFABQAYADAWgHQgBgEgFgEIgIgHQgFgEgCgFQgCgFAEgEQACgCAIgBQAhgBAcAJIgWgwQAUgDAQAOIAAgjQAAgFADgDQACgCAEABQAEABADAEQADAFAFATQAEAPAIAFQAOgsAVgqQAFgIAEACQACABAAAIQgBAdgLAaIAhgnQAFgFACACQADACgDAGIgfA8QAMgCALgPIAJgNIAJgMQADgDADAAQAGACgEAIIgDAFQgCADABADQAPgUAWgNQAAAGgIAIIgbAbQgFAGgFAAQgCAAgCgDQgBAAAAgBQAAAAAAgBQgBAAABgBQAAAAAAgBQgNASgLAFQgFAEgEgCQgEgBgBgGQAAgFACgFIAFgJQACgFgBgEQgEAHgIAIQgFAEgCgBQgDgBABgIIAKgeQAHgSgCgNIgiBRQgDAGgEAAQgFABgDgIIgSgsIgDAwQgRgLgRgEQAQAZAHAaQglgLgnAEIASAUQAEAGAAADQgBAFgJACQgVAFgUgCQAKAKATAHIAgAMQAGADAAACQABAGgJACQgdAIgYADQAUAXAZAPQAIAGgDADQgBACgEAAIgsACQABALATAEIAxANQgtAHgmAZIBCgNQADAKgQASQgQAQADALQAegPAjgHQgIAYgPAUIA5ghQAIgFACAEQACADgDAGQgNAUgFAVQAQgGAJgRIAFgIQAEgFAEAEQACACAAAFIgCAmQATgMALgSQANgVALADQAKACABASIABAMQAAAHADAEIAQg1QADgIAEAAQAGgCAEAMIAMAnQAEABACgEQADgEAAgFQAAgUgGgVQgBgHACgCQACgDAFACQAFACAEAEQAWAcAUgFIgagwQgCgGABgCQACgDAIACQAZAIAagFQgIghgfgSQgFgCgCgEQgDgFADgDQABgBAHAAQAVAEAWgBQAIAAADgFQgJgMgWgGIglgLQgGgCABgCQAAgFAJABQAgAGAngEQgHgTgdgCIgXAAQgNAAgJgCQgIgBABgFQABgDAEgCIAxgeIg6AHQgDgFAIgIIAdghQgJAAgTALQgRALgKgDQALgVAMgUQgTAMgYAIQgKADgDgEQgDgEADgGQAMggAXgYQgTAdgNAhQANABAWgNQAXgOALAAIgjAwQAKABAUgMQATgMAKADQgRAZgVAVQAVgGAegCQAGAAACACQACADgCAEQgCADgFACIgsAaQAOACAcAAQAZACANAMQAIAIgCAIQgDAIgPgBIgLgBQgHAAgEABQAGAFARAGQAGADADAFQAEAGgDAGQgCAFgHACQgHADgOgBQgPgBgHABQAXASAMAZQAFAIgEAGQgDAFgJABQgZACgVgFQAOATAJAXQADAIgDAEQgEAGgLgDQgZgGgPgWQAGAfgCARQgCAKgFADQgEADgFgCQgGgCgDgEQgDgFgCgQQgBgNgGgHIgPA3QgCAHgDADQgDADgDAAIgEgBg");
	this.shape_34.setTransform(61.7931,29.3528);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#0033FF").s().p("AgGD5Qg0gBgxgYQgxgXgigoQgigqgPg1QgPg1AJg0QAIg1AgguQAfguAugcQAugcA3gGQA2gHAzARQBFAXAwA8QAvA7AGBIQAFA0gSAzQgRAzgkAnQgkAmgyAVQgvATgxAAIgGAAgAAbCZIAFAqQABAHADACQAFADAFgFQACgDACgHIAPg3QAGAHABANQACAQAEAFQADAEAFACQAGACAEgDQAEgDACgKQACgRgFgfQAPAWAZAGQAKADAEgGQADgEgDgIQgIgXgOgTQAVAFAZgCQAJgBADgFQADgGgFgIQgMgZgWgSQAGgBAPABQAOABAHgDQAHgCADgFQACgGgDgGQgEgFgGgDQgQgFgHgFQAFgBAGAAIALABQAPABAEgJQACgIgIgIQgNgMgagCQgcAAgOgCIAtgaQAEgCACgDQADgEgDgDQgBgCgHAAQgdACgWAGQAWgVARgZQgLgDgTAMQgUAMgKgBIAkgwQgMAAgXAOQgWANgNgBQAOghATgdQgXAYgMAgQgDAGACAEQADAEALgDQAYgIATgMQgNAUgLAVQAKADASgLQASgLAKAAIgeAhQgIAIADAFIA7gHIgyAeQgEACAAADQgBAFAIABQAIACAOAAIAWAAQAeACAHATQgnAEghgGQgIgBgBAFQAAADAFACIAlAKQAXAGAIAMQgCAFgJAAQgVABgVgEQgHAAgCABQgDADADAFQADAEAFACQAeASAJAhQgaAFgZgIQgIgCgCADQgCACADAGIAZAwQgUAFgWgcQgEgEgEgCQgFgCgDADQgBACABAHQAFAVAAAUQAAAFgCAEQgDAEgEgBIgMgnQgDgMgHACQgEAAgCAIIgQA1QgDgEgBgHIAAgMQgBgSgLgCQgLgDgNAVQgLASgSAMIACgmQAAgFgCgCQgEgEgFAFIgFAIQgJARgQAGQAFgVANgUQAEgGgCgDQgDgEgIAFIg5AhQAPgUAJgYQgjAHgeAPQgDgLAPgQQAQgSgDgKIhCANQAmgZAugHIgygNQgTgEAAgLIAsgCQADAAACgCQADgDgIgGQgZgPgUgXQAYgDAcgIQAJgCAAgGQgBgCgFgDIgggMQgTgHgLgKQAVACAUgFQAJgCABgFQABgDgFgGIgSgUQAngEAlALQgGgagQgZQARAEAQALIAEgwIASAsQADAIAFgBQADAAADgGIAihRQACANgGASIgLAeQgBAIAEABQACABAEgEQAIgIAFgHQAAAEgDAFIgEAJQgCAFABAFQABAGADABQAFACAFgEQALgGANgRQgBAAAAABQAAAAAAABQAAAAABABQAAABAAAAQACADADAAQAFAAAEgGIAbgbQAJgIgBgGQgWANgPAUQAAgDACgDIACgFQAFgIgGgCQgDAAgEADIgJAMIgIANQgMAPgMACIAfg8QAEgGgEgCQgCgCgFAFIghAnQALgaACgdQAAgIgDgBQgEgCgFAIQgVAqgNAsQgIgFgEgPQgFgTgEgFQgCgEgEgBQgEgBgDACQgCADAAAFIgBAjQgPgOgVADIAXAwQgdgJggABQgJABgCACQgDAEACAFQACAFAEAEIAIAHQAFAEABAEQgWAHgXgDQgGgBgCADQgGAFAMAIQAgARAdAKQgXAIgZADQgJAAgCAEQgDAGAJAGIAnAhQgRAAgRADQgIABgCAFQgBAFAHAGQAMAJAeAIQghAKgbARQgGAEAAAEQACAHAKgEIA+gQQgBAJgNAOQgNAOgCAJQgBAGAFADQACABAFgCIAcgMQAQgGAMAAQgSATgJAaQAlgOAegXIgQAmQgFANAHACQADABAGgDQARgMAKgTQgDARABAUQAAAGADADQAFAEAJgIQAOgNAKgRQAJgNAHAAIAEABg");
	this.shape_35.setTransform(61.5223,30.5901);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_35},{t:this.shape_34}]}).wait(101));

	// white
	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AjDDQQgzgNgXgOIgZgRQgPgLgKgFQgXgKghACIg6AHQghAEgagIQgfgJgMgYQgHgOABgQQACgQAJgNQAUgZAtgDIAkgBQAXAAANgDQgEgVANgWQAMgVAWgNQAQgJAbgKIAtgPQAmgPBDgxQBDgwAngPQAfgNBBgLQAxgIAeAAQAsAAAhAOQAYAKAZAWQAPAOAbAdQBeBmAmAzQAOASAHAIQANAOANAIQAGAEARAIQAPAIAIAGQARAOAGAZQAFAYgJAXQgQAqgxAWQgeAOg9AJQhpAOhpAAQi4AAi1gsg");
	this.shape_36.setTransform(58.5544,31.5407);

	this.timeline.addTween(cjs.Tween.get(this.shape_36).wait(101));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.7,-8.9,132.6,73.5);


(lib.lefteye2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// eyeliner
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AABBlIgagMQgHgEgGACQgCABgDAEIgGAFQgFADgJgCIgQgDIgIABIgJACQgIAAgJgHIgQgKQgEgCgQgCIgtgFQgkgEgOgFQgSgIgHgBQgOAAgHgCQgEgBgFgFIgJgGQgFgDgJgCIgOgDQgPgEgWgQQgJgGgFgGIgIAAQgRgDgigCQgjgCgRgDIg4gMQgigIgXgBIgOAAQgIgBgGgCQgHgDgEgFQgFgGABgHQABgGAEgDIAAgBIAAAAQAHgGAPgCQAbgEApAHIAWAEIAYABQAKAEAaAFIAlACQAjABARACQAUADAdAHIAwAMIAyALQB2AVBJAGQCaANCVgdQAUgIAagJIArgSQAfgFAkgLQAhgKAUgJQAYgMAPgQIAEAAIAHADIADgBQADAAAFAFIAJAFIAQAGIASAFQAKADAGAAIAKACIAGACIAFAAIAagBIAIgCQAIgBAFAEQAHAFgDAIQgCAEgGADQgGAEgHAAIgTABIgUgBIgDAAIADACQAFAGgEAKQgDAJgJAEQgOAGgUgKQABAIgIAIQgKAHgEAEIgFAGIgHAFQgEADgSAAQgOAAgdANQgbANgQgBQABAKgMAFQgOADgGACQgLAHgGACQgGACgIAAIgPgCQgMgBgGAEIgFAEIgGAFQgHAEgPgBQgRgBgHADIgNAIQgHADgJAAIgRgDQgOgCgMABIgUAFQgaAGgbgHQgQgFgGACIgMAHQgGACgKgCQgMgCgEAAIgRAFIgGAAQgJAAgMgFg");
	this.shape.setTransform(65.4256,53.9204);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAoBWQgKgKgFABQgCABgGAGQgGAFgIABQgHABgGgEQgJgFgCAAIgIADQgVAJgjgaQgEAGgIACQgIACgIgCQgLgCgQgNQgMAKgSgFQgOgEgOgLQgIAGgLAAQgKAAgIgFIgKgKQgGgHgEgCIgTgIQgPgJgJgCQgUACgIgFQgDgCgCgDQgpgGgagFIhHgRQgpgKgfAAIghABQgTAAgNgCQgOgBAAgIQAAgFADgDIAAgBIACAAIAHgDQAXgIAsgDQBAgFAhAJIAlALQANADAZADQBAAJCAALIBlAJIBSAGQAuADAkgBQAugCA4gJQAigFBEgNIBNgPQBKgNAmgQQAPgHAGgBQANgEAJADIACAAQAEgEAFAAQAFgBAGADIAFACIAHgBIAKABIATAAIAQAFQAIAEAEAEQAEAEABAGQACAHgDAFQgEAMgMABQABAGgEAHQgDAHgHAEQgMAIgSgFQABAKgKAHIgTAJQgQAIgGABIgMABIgLABQgHABgJAEIgQAIQgYAMgdgEQgTgCgEAAQgHABgRAJQgKAGgJADQgOAFgPgBQgPgBgNgIQgQAUgTAEQgYAGgRgOQgCAJgMADQgIACgNgDQgTgDgKACQgFABgIAEIgOAFQgIADgHgCQgIgCgEgFQgJAIgNAAQgOAAgJgIg");
	this.shape_1.setTransform(62.2022,52.0708);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgMA1QgEgDgGgJIgEgFIgTgBIgGABIgWgBIgRAEQgKADgHgDIgHgGQhwgGhegMQgtgGgOgBQgqAAgUgCIg5gKQgggEgoAGQgMABgEgCQgEgBgCgDQgDgEABgEQAAgCADgDQgHAAAAgBIAJAAIAGgEQAdgMAqgBQAQAAA6AEQAbACBfAEIBgACQDfAGBwABQAsAAAVgCQAVgCAogIQAngHA2AAIBeAAQAtAAAYgHIAhgKQAUgDANAJQAEADACAEQAHgCAHACQAOAFACANQABAIgHANQgKAPgMACIgKACIgKAIQgKAJgTAAQgUgCgKABQgFAJgMACQgMABgIgHQgLAJgZgHIg3gOQADAFgDAGQgDAFgGADQgIAEgPgCIgrgEQgPgBgKgDIgHABIgNACIgKAGIgKAFQgNAFgYgNQgNAPgagHQgNgDgDABIgNADQgRADgagSIgDAAQgDAFgHAEQgHAEgIABQgJAAgVgHQgEAIgKADIgFABQgGAAgFgEg");
	this.shape_2.setTransform(60.3563,48.3169);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AA/AsQgNgDgYgPQgKALgQABQgRAAgLgKQgIAEgJAAQgKgBgHgFQgGAIgMgDQgMgEgHgBIgIgBIgBAAQgYABgSgBIgmgEIglgEQgXgCgggBIg2AAQhqgBhsgRQgTgDgKgFQgLAAAAgBIAJAAIACAAQAMgHAZgEQA2gHBGgCIB8gBQA1AAAjADIA6AGQATABAbgDIAtgFQBkgMC6AFQDIAEBYgHQAegDAOAGQALAFAHAKQAGALgEAKIgCADIABABQAGAHABAJQABAKgGAGQgJAKgSgGIgbgNQgEAGgHADQgHACgHgCIgHgEIgIgCQgEAAgGACQgHADgEgBQgDAAgHgDQgHgEgEAAIgIACQgGADgCAAIgJgCIgIgCQgEgBgOAFQgLAEgbAAQgbgBgNgCIgQgBQgLAEgGAAQgHAAgLgHQgMgIgGgBQAAAIgHAHQgGAFgJABQgLABgWgLQgEAGgHADQgIADgHgCIgRgFQgDAAgIADQgLAEgLgBQgMgCgIgIQgFAJgKAEQgGACgHAAIgIAAg");
	this.shape_3.setTransform(59.2321,47.1864);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AIkArQgGAAgTgGIAAAAQgJACgIgBQgPgHgJABQgEABgIAEQgJAFgEAAQgIABgHgGQgGgFAAgGIgTgBIgBAAIgEAAIg1gBIg/AAIgJACIgWAGQgKADgHgCQgHgDgCgHIg4AAIgGAEQgHAEgIgEIgGgEIgJAAQgFAGgIAAQgKAAgGgGIgxAAIgCABIgSAAQgFAAgIAEIgNAFQgHABgHgEQgEgDgBgEIguAAIgGAFQgHADgHgDQgFgCgCgDIhxABQg5ABgTACIg3AHQgaADgkAAQheAAhNgIQgLgBgFgDQgJgFACgJIgFAAIgJAAIAPgBQADgJASAAIBsACQA+AAAsgGIBAgMQAegFBIgCIA6gBIACgDQAJgHAMAAQAMABAGAIIADAAIAFAAIAxgBIAHgDIAIgIQAFgEAEgCQAKgDAPALIAGAGIAsAAIABgCQAHgGAGgDQAIgEAIACQAJACADAIQAEgDAIACIANADQAFAAAKgDQAGAAAFAEIA0AAIACgCQAJgHAFgBIAIACQAFADACAAQAEAAAGgCIAKgCQAFAAAEADQADACACAEIABAAIAigBIAJgFQANgHAIgBQAOgBAFALQAFgFAMAAQARABADgBIAQgEQAIgBAFAIIADAGIAOAAQASABAKAEIABAAIAOACIATgGQAKgBAOAHQAIADAEAEQAJACAEAGQADAFABAEIABADQAEAJgCAKQgDAJgIAFQgHAFgKAAIgHgBg");
	this.shape_4.setTransform(58.6731,45.8842);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AHlA7IglgJQgpgKhigOIh7gPQhNgIh5AFIimAJIhiAHQhiAGgxABQhRABhAgKQgRgCgCgKIAAgDIgEAAIABAAIgBgBIAEAAQAAgEAFgCQAGgFAIgBQAMgBAfAEQA7AGBugOICRgTIBngNQAbgMAOAAIANABQAIAAAFgBQAGgBAMgFQAJgCASADIAgAFQAXAEANgBQAIAAASgEQARgEAJABIATACQALABAHgBIAMgCQAHgCAFABQAHABAEAEQAFAFgBAFIABAAIADABQA6gBAeABQAzACAoAJQAJADAJAAIASgFQAXgIAXAFIAeAIIAUADQAKABAPAHQARAHAHACQARAFADACQAGADABAIQACAIgEAGQgGAKgSADIgBAGQgEAHgHAFQgLAJgTABIgGAAQgOAAgSgEg");
	this.shape_5.setTransform(59.3705,45.8441);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AIVBRQgSgDgbgLIgrgTQgXgIgtgGQgxgFgUgGIg2gRIgFgBIgjgDQgpgCg0AAQgoAAgrABQgrAEgqACIgPABQgiACgzAFIhdAJQhRAIg4AHIhAAHIg8AEQgrAAgYgCQgJAAAAgBIAAgBIAAAAQAAgBAOgBIAVgCQgIgDABgEQAAgGAKgDICQgeIBMgMQACgCAEgCQAFgDAQAAQAOABAHgFIAHgGQAEgEAEAAQADAAAHADQAGADAEAAQAHAAAMgJQAEgCAIABIANAAQADgBAOgHQALgFAHABIAGADQAEACADgBIAJgEQAEgCAHADIAKAFQAJACANgIQAQgJAFgBQAHgBAQADIAZAHQAIgGATgCQATgDAJgFIAIgGQAFgDAEgBQAIgCAJAFIAPAKQAGAFAGAAIAKgGQALgHAMAEIAJAEQAFABAEgBQAEgCAHgHQAIgFALAIQAPAKAEABQAFABAIgDIANgEQAIgCAHABQAHACACAHQAFgHAIgBQAJgBAGAFIAFAGIAFAFQAGADAMgCQAOgEAEABQAHAAAOAFIANAAQAHAAAFABQAGABAFAEQAFAFgBAFQALgCALAIQAGAGACAHIARADQAIgBAIADQAHACAHADIAnAPQAaALARADIARADQAKACAFAFQAIAGABALQACAKgGAJQgKAMgUAAIgLgBg");
	this.shape_6.setTransform(58.04,41.3875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AHfBQQgLgFgPgLIgFgDIhUgbQgngNgbgGQgqgLgtgDQgpgEg0ABQguAAgyADQgpACgvAGQghAEg0AIIhdANIgUACIhMAOIg+AKQgdAGgRABIgNAAIgtADQgrACgYgDQgJgCAAgBIAAAAIAAgBQAAgBAOgCIAOgCQgHgFACgIQACgGAJgDQAGgCAQABIATAAIAEAAIACgCQAPgLAmgIIC9gmQAAgEADgEQAEgFANgCQAXgEAwgCQAXgCAOAEIAKgBQAEgHAIgFQAJgFAKABQABgIAHgFQAHgEAHACIAIADIAIADIAMgDQAJgCAKACQAJADAGAHQANgNAKgDQAQgEAKAJQANgOALgBQAIgBAGAFQAHAEABAHQAKgNAPgBIAKgBIAKAAIALgDQAGgBAFAAQAHABAFAGQAFAFAAAHQAVgKAMAEIALAHQAHAFAFABQAFACAIgCIANgDQAHgBAHADQAHADAAAGQALgBAHACQALAEAAAIQAMgDAXADQAYADAKgCIAMgEQAGgCAFABQAHABADAFQAFAGgEAFQATgCARAXIACAEQANAFALAIIAUAOQAMAIAKADQAIACAOAAIAVACQALACAIAHQAKAHgBAKQAAAOgOAHQgKAFgQABIgKABQgfAAgXgLg");
	this.shape_7.setTransform(58.5888,38.9075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AH2BfIgVgMIgXgJIhXgkIgNgGIgbgIQhAgRgZgEQgpgGg6gBIhjAAIghAAQghAEglAFQghAEg0AKIhdARIhIAOQhSAVgzAPQgVAHgNACQgTADgOgFQgOAFgPABQgNABgHgHQgEgFABgFIgFgBQgKgCABgCQgBgCAPgCIADAAQADgGAJgCIAIgBIAJAAQADgBALgFQAJgFAGABIAAAAIABAAIAxgQQBrgjA2gNIAJgCQgBgEAFgFQAFgFAHgBQAKgCAWABQAUABALgDQAJgDAPgKQAPgKAIgDQAJgEAUgCQAVgCAKgDIABgBIACgHQADgHAFgEQALgIAPAHIAIAGIACABQAFgBAGABQAGACAEADIAEAAIAAAAIACgCIABgCIAAgGQgBgGAFgFQAFgFAGAAQAFAAAEAFQAEAFAAAGQAFgMAEgFQAJgIAJABQALACAFAPIACAKIAVgHQAQgCAEALQAPgNAIgCIAAAAIABAAQAEgHADgCQAGgGAJADQAKACADAIIABAEIADAAQALABAEAKIACAAQALgJANADIAOADQAEAAAHgDIAKgCQANACAEAQQAQgGAIABQAHABAFAEQAGAEAAAGQAPgCAHACQANADAEALQAhAIAmABQAYABADANQALACAMAKQAIAGAMAMQAIAKACAIIAOAIQAVAMAsAdQAPALgBAJQAAAIgIAEQgHAEgJAAIgCAAQgVAAgbgOg");
	this.shape_8.setTransform(57.8964,37.1146);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AIbCCQgWgCgNgIQgHgFgJgJIgHgIIgWgLIhXguQgngWgbgKQgSgHgTgEIgKgEQgZgHgQgBIgMABIgCgCIAAAAQgkgFgqABQguAAgyAGQgpAEgvAJQghAFg0ANIhVAUIibArQgQAFgIgBIgFAAIgaAGIgIACIAAAAQgMAHgFABQgKADgJgDIgFgDIgLACQgrACgYgFQgJgDAAgCQgBgDAPgCIA9gOIAKgCIAFgDIAJgCIAMgEQAigTAHgDQAJgEAHABIAEgDQALgFATgFIACgBQADgDAOgFIAggIQgBgFACgEQAEgMANgCIASABIARACIAAAAIAFgEIAPgIIALgEQAGgCAEgDIAHgKQAFgGAEAAQADgBAFACIAHADQAGABAHgBIASgCIAAgFQABgHAIgEQAHgEAGAEQACgHAIgDQAIgEAHAEQAFADACgBQAEAAACgFIAEgJQAFgFAJACIAPAEQADABASgEQAPgEAOADQAHABACgCQAEgCACgIQAEgGAIABIAPADQAGABANgCQAMgBAHACIALgCIADAAIAAgLQADgKAJgEQAKgDAHAHIAKAJQADADAKAAQAKABADAEIABABIAEABIAUABIAAAAIAGgFQAFgDAIgBIANgBIAOgCQAIgBAFADQAFADAGAHIAFAEIACAAQAOABALAGIAEADQANAEAFACIAPALQAJAHAIACQAHABAOAAQAJACASAJIAYAHQAPAGABAMQAZAOAcAJQAWAFAFAKQABAEABAKIASAPIApAiIAIAJIADACQASAMgBALIgBACIgBAHQgDAHgFADQgHAFgLAAIgIgBg");
	this.shape_9.setTransform(57.7976,35.2167);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AIoCPQgEgCgKgLIgCgCQgJACgJgDQgJgEgNgMIgEgEIgLgFIgigWIhWg4IgbgSIg4gdQgjgPgjgHQgqgIgzABQgvgBgxAIQgpAFgvAMQgiAIgzAQIhdAaQhRAXg5AVIgpANIgWAHIgBAAQgfAHgeAEQgrAEgYgIQgJgDABgCQgBgEAPgEQAcgGAhgKIA5gTIAUgHIAYgNIAQgJQACgMARgEIAOgCQAJgCAFgDQAFgCAGgGIAKgJQAKgHAVgIQAWgIAJgBQAPgBAFgDIAIgIQAFgEADgCQAEgBAJABQAHABAEgDQADgBADgGIAGgIQAFgDAKABQAMACAEgCQADAAAGgEQAFgDADgBQAFgBAMACQAIgBANgJQAEgBAJgBIANgCQAFgBAOgHQALgGAHAAQADAAAKADQAIADAEgBQAHgBAKgIQAKgFASACQAXACAHgBQAHgBAPgFQAOgEAJAEIALAEQADgBAEgDIAGgHQAFgGAJAAQAIgBAHAFIAGAGQAEADAEABQAEAAAEgDIAGgFQAKgGAMAEQAMADAFALQAMgEALAIQAMAIAAANQANgFARAMIAOAKQAIAFAHABIAKAAIAKABQAJACANAPQAIAKAHABIAPgBQAHAAAHAEQAHAFADAHIADAIQACAEADACQADACAEABIAHABQAIABAIAJIAGAHIAPAIIAgAXIASADQALAEAEAIQABAEgCAEIAMALQALAMACAMQAMAHAGAIQAKAMgEAOQgDAKgKAEQgFACgEAAQgGAAgFgDg");
	this.shape_10.setTransform(58.929,34.9738);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AIuCjQgJgDgOgMIgNgDQgWgIgUgNIgigZIhWhFQgbgWgUgNIgCgBIgxgaIgVgKQgRgGgRgFIgQgDQgTgCgcAAQg9AAgvACIgSADQgpAHgvAOQgiAJgzATIhdAgIgoAOIgXAJQghANgVALIgWALIgWALQgZALg2AJQgiAHgVgBQgJgBgEgDQgNgBgJgEQgJgDABgEQgBgEAPgEQAcgIAhgMIA5gXIAagLQAAgDACgFQAEgIAIgEQAGgEAKgCIAQgDQAPgFAUgOIAQgKQAPgLALgBIALAAQAHAAAEgBQAEgCAFgFQAGgGADgBIAKgCQAHAAADgCIAIgGQAEgFADgCQADgCAHgBIAJgEQAFgCAIgLQAIgJAGgCIALAAQAHABAEgBIAHgGIAIgGQADgCAIgBIALgDQADgBAFgGIAHgHQAFgDAJAAIAPABQAKgBATgGIAngCQAWAAAMgJIAQgMQALgFALAGQAHAEADAHQAFgFAKgFQAbgPAQAGIAIAEIAIADQAFABAHgDIALgGQAQgHAPAJIAKAHIALAGQADABAPAAQALABAFAFIAFAHQACAEADACQADADAMABQAMACAJAIQAKAIABALQALgEANAFQAMAFAFALQAFAKACACQAEADAGgBIALAAQANgBALAJQALAKABANQAKgDAKAEQAKAEAGAIIAHANQACADAOAHQAKAHgBAJQAJgCAIAIIAMAOQAGAFAOAGQAOAFAGAGQAFAGADAMIAHATQAEAJAMARQAKASgJALQgGAIgKAAIgJgBg");
	this.shape_11.setTransform(59.0368,32.2852);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AIzCyQgHgBgKgIIgBAAQgFACgEAAQgJgBgLgEQgVgJgUgQQgNgKgUgTIhWhRQgngmgbgSQgpgdgtgMQgpgMg0ABQgugBgyALQgoAIgwARQghALg1AWIhdAlQhRAig5AdQgxAWgQAHQgfAKgeAFQgqAFgZgKQgJgEABgEQgBgFAPgGQAcgIAhgOIA6gbIBagrIAwgWIAFgGQAJgFADgFQADgDACgHQAFgIANgBIAVAAIAMgCIAMgJIAFgDIADgEIAKgPQANgPASAFQABgIAHgGQAHgGAJAAQABgHAGgFQAHgFAGABIANABQADgBAEgEIAHgGQAEgDAIgBIANgBQAJgBAKgGIAegQQARgIAOAAIAQACQALABAGgBIANgFQAHgDAGAAIAKADQAGADAEgBQAGAAALgGQAHgDAHAEQAHADADAGQAIABAKgEIARgIQAWgMAMAJIAMAJQADABAIAAIAsAAQAUgBAKAHQAGAFABAJQABAJgHAEQAHADAMAAIAUACQALACAHAHQAIAIgCAJQAVAFAJAIQAHAGACAIQADAJgEAHQAGAEAKACIARAFQAKADAGAGQAGAHAAAIQARAJAXAPQASANABALIAAAHQAOANALAMQANgCALANQAIAJAGASQACAIACADIAGAIIAJALIAJAJQAFAFACAFQAGAOgKALQgHAJgLAAIgFgBg");
	this.shape_12.setTransform(59.5773,30.1175);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AIqC+IgKgDIgCABQgEACgFAAQgJgBgLgFQgVgKgUgSQgNgLgUgWIhVhcQgngrgbgVQgoghgtgOQgqgNgzABQgvAAgxAMQgpAJgwATQghAMg1AZIhdArQhRAng6AgQgwAagRAHQgeAMgeAFQgrAGgYgMQgJgEAAgFQAAgFAPgHQAcgKAhgQIA5geIBNgqIABAAQADgEAGgDIAKgHIAHgFQAFgDAEgBIAGABIALgFIABgHQAAgNAQgGQAHgDAUgBQAKgBAKgDIAYgMIABgFIAAgGQABgLARgDIAMgCQAHgCAEgDQAFgEAGgSQAEgQAKgDQAGgCANAGQAMAFAHgCIAIgFIAGgIQAJgIANgBQANgCAJAHIAVgQIAJgFQAGgLASgBIAPgBIAOgBQAMgDAWgLQAKgDAJACQAKADADAJQAhgXAoADQAZACACAQQAUgKAMABQAJAAAHAFQAIAGAAAIQAIACALgBIATgCQAYgDAMAKQAIAGABALQABALgIAEQAJAEAaAAQAYABAKAJQAGAGABAKQAAAKgHAEQAMAAAJAJQAJAKgBAMQAGAIASAEQAUAEAGAFQAIAFABALQABAKgGAFIABABIADACQAHADAMADQARADAGAHQAFAGAAAJQAAAGgDAFQANAPANATIAFAEIANAHQAIAEAEAEQAGAHAAAKQgBAJgGAHQASAEAJAHQAOALgCAOQgCAMgNAGQgIADgJAAIgJgBg");
	this.shape_13.setTransform(59.8876,28.2353);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AISDPQgJgBgLgFQgWgMgVgUQgNgNgWgZIhahpQgpgwgcgYQgqgmgugQQgqgPgzABQgvABgwANQgpALgvAVQghAOgzAcIhbAxQhPAsg4AkQgvAfgQAHQgeAOgeAFQgqAIgZgOQgJgFAAgFQgBgGAPgIQAbgLAggTIA4giIA7glIgBgBQgCgHADgEQAFgHAQgBIAMgBIAMgHIgDgDQgFgKAFgIQAEgFAJgBIAPgBQANAAANgDIAbgQIABgHQADgFAOgEQAJgCAJgEIARgJIAEgCQgEgGADgHQADgHAHgEQAGgDAIgBIAPgCQAFgBADgCIACgFIABgFQACgHAHgFQAHgEAHAAQAKAAATAHQAHgUAJgGQAHgEAJACQAJADAAAIQAbgGAUgUIANgNQAIgGAHACQAIABADAIQACAFAAAFIAIgCQALgFAHgJIAKgKQAGgGAFgBQAHgCAUAHQAeAKAbgJQANgGAFAAQAJgBAHAHQAHAHAAAIQAlgLARAMQADACAJALQAHAJAHADQAFACAIgBIAPgCQATgDAHAKQAHAJgIATQAXABAYAGQAOAEAFAHQAFAGgBAKQgCAJgHAEQAFAGAWAHQAVAHAAAOQABAEgDAGIgEAJQAXgDAMgBQATAAAGAIQAEAEAAAIQAAAGgEAFQgDAHgPALQgBAAgBAAQAAABgBAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABABAAQAAABABAAQAAAAABAAQAFADAJAAIAPAAQAUgBAHALQAEAHgDAJQgEAJgHAFQAJAPAIAHQAIAIAGACQAFACAQgBQANAAAGAEQAFAEACAHQACAGgCAGQgEAMgMAHQAFAGAMAAQAOgBAFADQAGACACAHQADAHgCAHQgFAOgPAEQgLAEgQgCIgJgCQgDAFgDACQgEACgFAAIAAAAg");
	this.shape_14.setTransform(60.244,26.5278);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AIFDsQgIAAgMgGQgWgNgVgXQgNgOgWgcIhch0Qgrg1gcgbQgrgqgugSQgqgQgzABQgvAAgwAPQgpAMgvAXQggARgyAeIhaA2QhOAyg4AoQguAhgRAJQgdAPgeAGQgqAIgagPQgJgFAAgGQAAgHAOgIQAbgNAggVIA3gmIAegUQgBgHAEgGQAFgIAJgEIAQgFQALgDAGgDQgRgQAHgMQAEgHAPgDQAMgCAWABIAOAAIANgJIAAgHQACgKAIgFQAKgHAVABIAdgTQgCgHACgJQADgIAIgEQAIgFAIADIAIAFIADACIAUgLQgEgXALgKQAEgEAHgBQAHgBAFACQAKAFACAJIAJgEQAIgLAEgNIAFgOQAEgHAFgEQAFgEAIABQAIABAFAGQAIAIgBALIABgBIAfgLIACgIIADgOQAEgSALgFQAMgFALAKQAIAJgBANIAFACIANgDIAGgEQAGgHAIgRQAJgPANAAQAHgBAGAGQAFAFACAHQABAJADADQADADAIgBQAbgDAJgKIAIgKQAEgGAEgCQAHgFAIADQAJACAFAGQAKAOgGASQAEgBAKABQAJABAFgCQAGgDAIgLQAGgFAKABQAJABAGAHQALAPgPAbIgCACIAMAGQAFgCALgDIASgLQAKgHAJAAQAJAAAFAGQAMAMgIASQgDAJgPARIAMAKIABAAQAGgEAKAAQAHgGAJgCQAIgBAIADQAIAEADAGQAGALgFAOQgDAGgKAQQAHABAJgBIARgDQAVgDAJALQAKALgIAPQgGALgNAIQAHABAKgBIAQgCQAVgEAJALQAJAKgGAOQgFAKgOAIQAHAJAPgEIAMgDQAGgCAFAAQALABAHAKQAGAJgDAKQgEAMgTAMQAGALAMAGQAMAFAMgBIARgEQAKgCAGACQAIACAFAIQAFAHgBAIQAAAPgOAOQgHAHgUAMQAIAAALgEIASgHQAKgDAJACQALADADAIQAFAMgLAMQgFAGgRAHQggANgWAAIgBAAIgEADQgEACgEAAIgBAAg");
	this.shape_15.setTransform(61.4773,23.5804);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AHxD/QgJAAgMgHQgWgOgVgZQgNgPgWgfIhch+Qgrg6gcgdQgrgtgugUQgqgSgzABQgvABgwAPQgpAOgvAZQggASgyAhIhaA7QhOA2g4ArQguAlgRAJQgdAQgeAHQgqAJgagQQgJgGAAgHQAAgHAOgJQAbgOAggWIA3gqIAQgMIAAAAQgDgSAQgNQAMgLATgCQgCgeANgKQAJgIAUACQAZACAHgCQgEgfAPgIQAIgFAQAEIAQAEIAKgHQABgVAOgOQAJgIAMgBQAMAAAIAGIAEgDQACgFAAgIQAAgOABgEQADgLALgFQAKgFAKAFIAHAFQAFACADABQALACAIgOIAIgWQAEgLAHgHQAIgIAKgBQASgDANATQAIgEAIgRQAHgQAIgEQAHgEAKACQAIADAHAHIAJAJQAGAFAFAAQAFgBAHgGQAHgIALgQQAKgOAPAAQAJABAGAIQAGAIAAAJQAFgBAKAFIAFADIAPAAQAFgCAEgGIAKgRQAHgJAMgDQANgDAJAHQAEAEAEAHIAFAMQAHAPAMACQAFgDAMgPQAKgMAJAAQAKABAFAKQAFAKgBALIgDAUQgBAKABAHIAFADQAMABAQgMQAUgRAJgDQAJgDAJACQAKADADAHQAFALgMAVIgTAgQAXgCAVgKQAOgHAHgCQAMgDAIAFQAKAGABAOQACAUgXAhQAMgMAIgEQAOgGAKAHQAJAGAAAMQAAALgFAMQgIAVgOAVIApgPQASgHAKAEQAJAEAEAJQAEAIgCAKQgCAOgPATQALAFAWgIQAXgGAKAIQAJAIgCAOQgBAJgIAMQgTAZgcAKQAeADAwgJQARgDAIAEQAJAGABANQAAAMgHAKQgFAGgLALQgLAKgEAGQAJABANgEIAWgIQAMgEALADQANADAEAKQAFANgNANQgIAIgRAGQgkANgXAAQgOgBgNgEQgDALgHAEQgDACgFAAIAAAAg");
	this.shape_16.setTransform(63.5559,21.7197);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},9).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).wait(76));

	// eyelid
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFC3C3").s().p("AgyFGQgZAAgTgFQgQgDgZgJIgpgNQgagIg2gIIhmgOQgZgEgOgFQgTgGgKgNIgXgEIgJgDIgVAAQgbABgLgCQgVgCgMgLIgCgBIgEgDIgKgCQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgHADgFIgBgIQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagLASgKIBCgnQAagOBCgbQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmAsQAgAjgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFASgLATIgDAIQgLAYgiAGQgMACgQgCQgQAYgnALQgaAIgvAEQgKANgXALQgkARgwAGQgfAEg5ABIjTAEIgbABIgSgBg");
	this.shape_17.setTransform(60.4811,23.7152);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFC3C3").s().p("AA4E7Qg6gBhzgUQi/gihngJQgagCgMgDIgJgDIgVAAQgbABgLgCQgVgCgMgLIgCgBIgEgDIgKgCQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgJIBCgnQAagOBCgcQgCgGABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmAsQAgAjgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFASgLASIgDAJQgLAYgiAGQgMACgQgDQgQAZgnALQgcAIgyAEQg5AFgWAEQgnALgUADQgRADgXABIgnAAIhCAEQgjACgXAAIgJAAg");
	this.shape_18.setTransform(60.4811,22.5318);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFC3C3").s().p("AgaEhQg5gBhwgPIhGgJQgzABgmgDIgVADQgVACgfABIg0AAQgbABgLgCQgVgCgMgLIgCgBIgEgDIgKgCQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgGADgGIgBgIQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgKIBCgmQAagOBCgbQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmArQAgAkgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAYgiAGQgQADgYgFQgOAGgTABQgPABgPgCIgMAAIgCAAIgFAAIhAAAIgRAGQgXAJgRAEQgZAGguAAIhpgEIhXACQgwADgcAAIgLgBg");
	this.shape_19.setTransform(60.4811,20.0068);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFC3C3").s().p("AA2EaQh+gMhAgCIh2ABQg6AAgqgDIgVADQgVADgfAAIg0ABQgbAAgLgBQgVgDgMgLIgCgBIgEgDIgKgBQgOgEgKgJQgGgGgDgGQgIgFgFgHQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgmQAagOBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAACIAWAMQAfAVAmArQAgAkgCAaIgCAGIABABIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAZgiAFQgQADgYgFQgOAGgTACQgPAAgPgCIgMAAIgCAAIgFAAIhQAAIguAAQgPABg8AJQguAHg7AAQgoAAgtgDg");
	this.shape_20.setTransform(60.4811,19.5877);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFC3C3").s().p("AoFEWQgVgDgMgLIgCgBIgEgDIgKgBQgOgEgKgJQgGgFgDgHQgIgEgFgIQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgmQAagOBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAADIAWALQAfAVAmArQAgAkgCAaIgCAHIABAAIAGAHQAPANAMAFQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAZgiAFQgQADgYgFQgOAHgTABQgPABgPgDIgMAAIgCAAIgFAAIjKAAQhBAAghgBIhFgFIhBADQgyABhTgDIgegBIhbACQg4ABgjgBIgpAFQgVADgfAAIg0ABIgNAAQgRAAgIgBg");
	this.shape_21.setTransform(60.4811,18.9589);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFC3C3").s().p("AG3ENIgYgLIgggDQhOgIg0gDQgzgChUAAQhnABgggBIg7gCQghAAgZADIg8AJQgmAGgzABIhKAAQgaACggAAIgHAAIgQACQgwALgZAAQgUAAgQgHIgJgFIgKgCQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgHADgFIgBgIQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgKIBCgmQAagOBCgbQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmArQAgAkgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAYgiAGQgQADgYgFQgOAGgTABIgIABQgYAAgXgJg");
	this.shape_22.setTransform(60.4811,18.8125);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFC3C3").s().p("AG3ENIgagMIgagMQgVgIgggDIg3gDIgqgFIgqgFQgkgEgrAAQhhgBiwASQg8AGgfAEQgzAJgaADQglAEg1ABIhHABIgIADQgMADgKgBQgLAAgJgFIAAAAIgGgBQgMACgMgDQgOgDgKgKQgGgFgDgGQgIgFgFgHQgNgRAFgWQABgHADgFIgBgIQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgKIBCgmQAagOBCgbQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBPg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbglAeQglAegIAaQAWgMAggMIA3gUQAigMAPgLIAYgTQASgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIAAACIAWAMQAfAUAmArQAgAkgCAaIgCAHIABABIAGAGQAPANAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAYgiAGQgQADgYgFQgOAGgTABIgIABQgYAAgXgJg");
	this.shape_23.setTransform(60.4811,18.8125);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFC3C3").s().p("AIAEMQgagHgwgUQgygVgYgHQgPgFgygLIgCAAQhagGgVgDIgUgDIhwABQhHABgYACQglADhIAMIkXAvQgeAFgOAEIgVAHQgMADgKAAQgMgBgKgGIgBAAQgNADgOgDQgOgEgKgJQgGgFgDgHQgIgFgFgHQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgmQAagOBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAADIAWALQAfAVAmArQAgAkgCAaIgCAHIABAAIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLASIgDAIQgLAZgiAFIgMABQgSAAgZgHg");
	this.shape_24.setTransform(60.4811,18.5748);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFC3C3").s().p("AIiENQgPgEgNgIQgMADgMgDQgPgDgWgRIAAAAIgggHQgrgIgXgNIgVgMQgIgEgXgGQjMgribAYIhlAUQhZAShaAKQg0AHgUAGIggAMQgTAHgNACQgcADgNAEQgUAIgKADQgNADgOgDQgOgEgKgJQgGgGgDgGQgIgFgFgHQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgnQAagNBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAACIAWAMQAfAVAmArQAgAkgCAaIgCAGIABABIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLATQgLASgTAHQgLADgMAAQgIAAgIgBg");
	this.shape_25.setTransform(60.4808,18.0947);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFC3C3").s().p("AIiENQgPgEgNgIQgMADgMgDQgPgDgWgRQgwgjgdgOQghgRgtgLQgdgHg2gKQg4gJgXgCQgqgDhCAHQhLAIhCAMQg5AKhPARIhFAQIhoAdQg+ARgrAGQgSACgOgBQgMABgLgCQgXgEgLgQQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgnQAagNBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAACIAWAMQAfAVAmArQAgAkgCAaIgCAGIABABIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLATQgLASgTAHQgLADgMAAQgIAAgIgBg");
	this.shape_26.setTransform(60.4808,18.0947);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFC3C3").s().p("AIiENQgUgFgPgNIgMgLIgMgJQgHgFgMgEIgTgIQgPgHgTgQIgBgBQgGgDgIgIIgNgMIgbgWQgVgNgqgOQglgNgZgEQgRgCgeAAIgvABQgLgBgzgHQgmgFgYADQgUADgdALIgwATQggALhEARIiFAgQg4ANgaAFIghAGQgTAEgNAFQgMAEgaANQgYALgOAEQgWAGgUgDQgXgEgLgQQgNgQAFgWQABgHADgGIgBgHQABgNAGgLQAJgPAcgRQAhgSAhgQIAtgVQAagMASgJIBCgnQAagNBCgcQgCgHABgKQAAgLACgKQACgHAGgJIAKgQIAOgZQAIgRAGgIQALgQAYgSIBPg+QASgNAJgBQAPgCAKALQALAMgIAOQgDAHgOAJQgqAbglAfQglAdgIAbQAWgNAggLIA3gUQAigMAPgLIAYgUQASgNAZgDQANgBAKAEQANAFADAMQAEAOgNANIAagEQAUgFAGABQAHABAFAFQAGAEAAAHQAWgEAcAKIAvAWIAfANIAeAPQAjATALAcIAAACIAWAMQAfAVAmArQAgAkgCAaIgCAGIABABIAGAHQAPAMAMAGQAQAIAkAJQAaAKATAPQAWASAFAUQAFATgLATQgLASgTAHQgLADgMAAQgIAAgIgBg");
	this.shape_27.setTransform(60.4808,18.0947);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFC3C3").s().p("AoLD2QgSgJgGgVIgCgJQgCgIAAgJQAAgNAGgLQAJgPAdgQQAggSAigRIAsgUQAbgMARgKIBDgnQAZgOBCgaQgBgHAAgKQAAgMACgJQACgHAGgKIALgPIANgaQAIgQAGgJQALgPAYgTIBQg+QASgMAJgBQAOgDAKAMQAKAMgHAOQgDAGgOAKQgqAbglAeQglAegHAaQAWgMAfgMIA4gUQAhgMAPgLIAYgTQATgOAYgCQANgCALAEQANAFADAMQADAOgNAOIAagFQAVgEAGABQAHABAFAEQAFAFABAGQAWgEAbALIAvAWIAfANIAfAOQAjAUAKAcIABACIAVAMQAfATAnAsQAfAkgCAaIgBAHIABABQAYAZgCAaQAAANgHALQgHALgLAFQgLAGgNAAQgNAAgLgGQgGgEgIgHIgMgNIgkgdQgigigTgOQgkgag8gGQgUgCgfgBIg0gCQg4gEgSABQgVABgrAKQhEAQglALQgoAMgbAMQgoAXgVAKQgWALgvARQg2AUgYAHQgrANgkAGIgPACIgTAIQgRAHgOAAQgOAAgMgHg");
	this.shape_28.setTransform(53.9294,16.3152);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFC3C3").s().p("AoAD2QgSgJgGgVIgCgJQgCgIAAgJQAAgNAGgLQAJgPAdgQQAggSAigRIAsgUQAbgMARgKIBDgnQAZgOBCgaQgBgHAAgKQAAgMACgJQACgHAGgKIALgPIANgaQAIgQAGgJQALgPAYgTIBQg+QASgMAIgBQAPgDAKAMQAKAMgHAOQgDAGgOAKQgqAbglAeQglAegHAaQAWgMAfgMIA3gUQAigMAPgLIAYgTQATgOAYgCQANgCALAEQANAFADAMQADAOgNAOIAagFQAVgEAGABQAHABAFAEQAFAFABAGQAWgEAbALIAvAWIAfANIAfAOQAjAUAKAcIABACIAVAMQAfATAnAsQAfAkgCAaQgCAZgWAMQgWAMgWgKQgQgGgQgUQgQgXgKgKQgXgYgzgTQgsgSgggFQgagEg0AAQguAAgXADQgdADgtANQhTAXgrAUQgnAUgTAJIgvATQgfALgQAHQgnAWgUAJQgRAHgmANQglANgSAJIgaAOQgQAIgKAEQgRAHgOAAQgOAAgMgHg");
	this.shape_29.setTransform(52.831,16.3152);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFC3C3").s().p("Am3D2QgMgBgLgHQgLgHgFgLQgGgLAAgNQABgNAGgLQAJgPAcgQQAhgSAhgRIAtgUQAagMASgKIBCgnQAagOBCgaQgCgHABgKQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgQAGgJQALgPAYgTIBOg+QASgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgqAbgkAeQglAegIAaQAWgMAfgMIA3gUQAigMAPgLIAYgTQATgOAZgCQANgCAKAEQANAFADAMQAEAOgNAOIAagFQAUgEAGABQAHABAFAEQAGAFAAAGQAWgEAcALIAvAWIAfANIAeAOQAjAUALAcIACAIIAEAJQAFAWgOASQgOASgXABQgMABgQgGIgbgLQgdgNgngHQgXgFgwgHQgegEgWAAQgRAAghAEQgfAFgfAHQg9APhvAwQg4AXgdAQQgjAXgSAKQgUALgxAVQgtAUgXAOIgiAVQgRAJgQAAIgEgBg");
	this.shape_30.setTransform(47.1526,15.7125);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFC3C3").s().p("Ak4CYQgLgCgHgLQgGgLAFgKQAFgLASgJQARgIATgIQgDgIAAgNQAAgLACgKQACgHAGgJIALgQIANgYQAIgRAGgIQALgQAYgSIBQg+QASgNAJgBQAPgCAKALQAKAMgHAOQgDAHgOAJQgrAbglAfQglAdgHAaQAWgNAfgKIA4gUQAigMAPgLIAYgUQASgNAYgDQANgBALAEQANAFADAMQADAOgNANIAagEQAVgFAGABQAHABAFAFQAFAEABAHQAWgEAbAKIAvAWIAfAMIAfAPQAjATAKAcQAFAMgCAMQgCANgMAEQgNAFgPgMQgNgPgIgGQgPgLgZgDIgsgBQgVgCg5gPQgxgNgeADQgOABgTAFIgiAJIguAIQgcAFgRAHQgMAFgSALIgeARQgMAFghAKQgdAJgPAIIgRAJQgIADgGAAIgDAAg");
	this.shape_31.setTransform(61.8071,6.2627);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFC3C3").s().p("AijB2QgIgIABgUQAAgMACgJQACgHAGgKIAKgPIAOgaQAIgPAGgJQALgPAYgTIBPg+QARgMAJgBQAPgDAKAMQALAMgIAOQgDAGgOAKQgpAbglAeQglAdgIAaQAWgMAggMIA2gTQAigMAPgLIAYgTQATgOAZgCQANgCAKAEQANAFADAMQAEAQgRAQQgNAKgYAKIgnARIgUALQgLAGgJADQgcAGgNAFIgjAPQgTAIgJAFIgPAKIgQALQgUAMgVADIgKABQgMAAgGgGg");
	this.shape_32.setTransform(51.3567,3.4436);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17}]}).to({state:[{t:this.shape_17}]},9).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).wait(77));

	// flare
	this.instance = new lib.eyeflare("synched",2);
	this.instance.setTransform(61.7,34.35,1,1,0,0,180,22.6,15.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(101));

	// pupil
	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgCBlQgVgBgUgJQgUgKgOgQQgOgRgGgVQgGgWAEgVQADgVANgTQANgTASgLQATgMAXgCQAVgDAVAHQAcAKATAYQATAYADAdQACAVgHAUQgHAVgPAQQgPAQgUAIQgTAIgUAAIgCAAg");
	this.shape_33.setTransform(61.4316,30.8064);

	this.timeline.addTween(cjs.Tween.get(this.shape_33).wait(101));

	// kashtit
	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#4083FF").s().p("AAhDYQgCgCgBgHIgGgqQgJgEgKAQQgKARgOANQgJAIgFgEQgDgDAAgGQgBgUADgRQgLATgRAMQgFADgDgBQgHgCAEgNIARgmQgfAXglAOQAKgaARgTQgMAAgQAGIgbAMQgFACgDgBQgEgDABgGQABgJANgOQAOgOABgJIg+AQQgKAEgCgHQgBgEAGgEQAbgRAhgKQgegIgLgJQgIgGACgFQACgFAHgBQASgDARAAIgogiQgIgGACgFQADgEAIAAQAagDAWgIQgcgKghgRQgLgIAFgFQADgDAFABQAYADAWgHQgBgEgFgEIgIgHQgFgEgCgFQgCgFAEgEQACgCAIgBQAhgBAcAJIgWgwQAUgDAQAOIAAgjQAAgFADgDQACgCAEABQAEABADAEQADAFAFATQAEAPAIAFQAOgsAVgqQAFgIAEACQACABAAAIQgBAdgLAaIAhgnQAFgFACACQADACgDAGIgfA8QAMgCALgPIAJgNIAJgMQADgDADAAQAGACgEAIIgDAFQgCADABADQAPgUAWgNQAAAGgIAIIgbAbQgFAGgFAAQgCAAgCgDQgBAAAAgBQAAAAAAgBQgBAAABgBQAAAAAAgBQgNASgLAFQgFAEgEgCQgEgBgBgGQAAgFACgFIAFgJQACgFgBgEQgEAHgIAIQgFAEgCgBQgDgBABgIIAKgeQAHgSgCgNIgiBRQgDAGgEAAQgFABgDgIIgSgsIgDAwQgRgLgRgEQAQAZAHAaQglgLgnAEIASAUQAEAGAAADQgBAFgJACQgVAFgUgCQAKAKATAHIAgAMQAGADAAACQABAGgJACQgdAIgYADQAUAXAZAPQAIAGgDADQgBACgEAAIgsACQABALATAEIAxANQgtAHgmAZIBCgNQADAKgQASQgQAQADALQAegPAjgHQgIAYgPAUIA5ghQAIgFACAEQACADgDAGQgNAUgFAVQAQgGAJgRIAFgIQAEgFAEAEQACACAAAFIgCAmQATgMALgSQANgVALADQAKACABASIABAMQAAAHADAEIAQg1QADgIAEAAQAGgCAEAMIAMAnQAEABACgEQADgEAAgFQAAgUgGgVQgBgHACgCQACgDAFACQAFACAEAEQAWAcAUgFIgagwQgCgGABgCQACgDAIACQAZAIAagFQgIghgfgSQgFgCgCgEQgDgFADgDQABgBAHAAQAVAEAWgBQAIAAADgFQgJgMgWgGIglgLQgGgCABgCQAAgFAJABQAgAGAngEQgHgTgdgCIgXAAQgNAAgJgCQgIgBABgFQABgDAEgCIAxgeIg6AHQgDgFAIgIIAdghQgJAAgTALQgRALgKgDQALgVAMgUQgTAMgYAIQgKADgDgEQgDgEADgGQAMggAXgYQgTAdgNAhQANABAWgNQAXgOALAAIgjAwQAKABAUgMQATgMAKADQgRAZgVAVQAVgGAegCQAGAAACACQACADgCAEQgCADgFACIgsAaQAOACAcAAQAZACANAMQAIAIgCAIQgDAIgPgBIgLgBQgHAAgEABQAGAFARAGQAGADADAFQAEAGgDAGQgCAFgHACQgHADgOgBQgPgBgHABQAXASAMAZQAFAIgEAGQgDAFgJABQgZACgVgFQAOATAJAXQADAIgDAEQgEAGgLgDQgZgGgPgWQAGAfgCARQgCAKgFADQgEADgFgCQgGgCgDgEQgDgFgCgQQgBgNgGgHIgPA3QgCAHgDADQgDADgDAAIgEgBg");
	this.shape_34.setTransform(61.7931,29.3528);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#0033FF").s().p("AgGD5Qg0gBgxgYQgxgXgigoQgigqgPg1QgPg1AJg0QAIg1AgguQAfguAugcQAugcA3gGQA2gHAzARQBFAXAwA8QAvA7AGBIQAFA0gSAzQgRAzgkAnQgkAmgyAVQgvATgxAAIgGAAgAAbCZIAFAqQABAHADACQAFADAFgFQACgDACgHIAPg3QAGAHABANQACAQAEAFQADAEAFACQAGACAEgDQAEgDACgKQACgRgFgfQAPAWAZAGQAKADAEgGQADgEgDgIQgIgXgOgTQAVAFAZgCQAJgBADgFQADgGgFgIQgMgZgWgSQAGgBAPABQAOABAHgDQAHgCADgFQACgGgDgGQgEgFgGgDQgQgFgHgFQAFgBAGAAIALABQAPABAEgJQACgIgIgIQgNgMgagCQgcAAgOgCIAtgaQAEgCACgDQADgEgDgDQgBgCgHAAQgdACgWAGQAWgVARgZQgLgDgTAMQgUAMgKgBIAkgwQgMAAgXAOQgWANgNgBQAOghATgdQgXAYgMAgQgDAGACAEQADAEALgDQAYgIATgMQgNAUgLAVQAKADASgLQASgLAKAAIgeAhQgIAIADAFIA7gHIgyAeQgEACAAADQgBAFAIABQAIACAOAAIAWAAQAeACAHATQgnAEghgGQgIgBgBAFQAAADAFACIAlAKQAXAGAIAMQgCAFgJAAQgVABgVgEQgHAAgCABQgDADADAFQADAEAFACQAeASAJAhQgaAFgZgIQgIgCgCADQgCACADAGIAZAwQgUAFgWgcQgEgEgEgCQgFgCgDADQgBACABAHQAFAVAAAUQAAAFgCAEQgDAEgEgBIgMgnQgDgMgHACQgEAAgCAIIgQA1QgDgEgBgHIAAgMQgBgSgLgCQgLgDgNAVQgLASgSAMIACgmQAAgFgCgCQgEgEgFAFIgFAIQgJARgQAGQAFgVANgUQAEgGgCgDQgDgEgIAFIg5AhQAPgUAJgYQgjAHgeAPQgDgLAPgQQAQgSgDgKIhCANQAmgZAugHIgygNQgTgEAAgLIAsgCQADAAACgCQADgDgIgGQgZgPgUgXQAYgDAcgIQAJgCAAgGQgBgCgFgDIgggMQgTgHgLgKQAVACAUgFQAJgCABgFQABgDgFgGIgSgUQAngEAlALQgGgagQgZQARAEAQALIAEgwIASAsQADAIAFgBQADAAADgGIAihRQACANgGASIgLAeQgBAIAEABQACABAEgEQAIgIAFgHQAAAEgDAFIgEAJQgCAFABAFQABAGADABQAFACAFgEQALgGANgRQgBAAAAABQAAAAAAABQAAAAABABQAAABAAAAQACADADAAQAFAAAEgGIAbgbQAJgIgBgGQgWANgPAUQAAgDACgDIACgFQAFgIgGgCQgDAAgEADIgJAMIgIANQgMAPgMACIAfg8QAEgGgEgCQgCgCgFAFIghAnQALgaACgdQAAgIgDgBQgEgCgFAIQgVAqgNAsQgIgFgEgPQgFgTgEgFQgCgEgEgBQgEgBgDACQgCADAAAFIgBAjQgPgOgVADIAXAwQgdgJggABQgJABgCACQgDAEACAFQACAFAEAEIAIAHQAFAEABAEQgWAHgXgDQgGgBgCADQgGAFAMAIQAgARAdAKQgXAIgZADQgJAAgCAEQgDAGAJAGIAnAhQgRAAgRADQgIABgCAFQgBAFAHAGQAMAJAeAIQghAKgbARQgGAEAAAEQACAHAKgEIA+gQQgBAJgNAOQgNAOgCAJQgBAGAFADQACABAFgCIAcgMQAQgGAMAAQgSATgJAaQAlgOAegXIgQAmQgFANAHACQADABAGgDQARgMAKgTQgDARABAUQAAAGADADQAFAEAJgIQAOgNAKgRQAJgNAHAAIAEABg");
	this.shape_35.setTransform(61.5223,30.5901);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_35},{t:this.shape_34}]}).wait(101));

	// white
	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AjDDQQgzgNgXgOIgZgRQgPgLgKgFQgXgKghACIg6AHQghAEgagIQgfgJgMgYQgHgOABgQQACgQAJgNQAUgZAtgDIAkgBQAXAAANgDQgEgVANgWQAMgVAWgNQAQgJAbgKIAtgPQAmgPBDgxQBDgwAngPQAfgNBBgLQAxgIAeAAQAsAAAhAOQAYAKAZAWQAPAOAbAdQBeBmAmAzQAOASAHAIQANAOANAIQAGAEARAIQAPAIAIAGQARAOAGAZQAFAYgJAXQgQAqgxAWQgeAOg9AJQhpAOhpAAQi4AAi1gsg");
	this.shape_36.setTransform(58.5544,31.5407);

	this.timeline.addTween(cjs.Tween.get(this.shape_36).wait(101));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.7,-8.9,132.6,73.5);


(lib.girlface = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// mouth
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ak4AbIiUgBQhTgChCgGQgUgCgIgGQgGgEgDgGQgCgIADgGQAGgLAaABQBjAIDHgBIKggDQCkgBBIgGIAVAAQAMAAAIAFQAJAFAEALQAEAKgHAIQgGAHgSACQhUAIipAAg");
	this.shape.setTransform(203.6944,413.1917);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(57).to({_off:true},1).wait(57));

	// eyes
	this.instance = new lib.lefteye2("synched",0);
	this.instance.setTransform(101.05,243.8,1.0783,1.0783,0,0,180,64.5,27.8);

	this.instance_1 = new lib.righteye2("synched",0);
	this.instance_1.setTransform(297.55,239.35,1.0783,1.0783,0,0,0,57.7,23.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{startPosition:0}},{t:this.instance,p:{startPosition:0}}]}).to({state:[{t:this.instance_1,p:{startPosition:57}},{t:this.instance,p:{startPosition:57}}]},57).to({state:[]},1).wait(57));

	// gair_front
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C3A16A").s().p("AdwTdIg5k6Qgii8gfh9QgWhZgahZIgSgOQgcgYghguQg2hMhBhtIhJh/QAiBQAZBFQBbD6AMDaQABAhgQAGQgTAHgUgdQhpiXhti8QAKAwAHAwQAFAlgGAaQgIAjgaAJQgeALgrgfQhUg7hBh0Qgfg4hEihQhjjoiKj0QgagMgagPQhSgthehOQAwBRA3BXQBdCWBKBtQAXAhAEAUQADAPgEAOQgEAQgMAIQgaASgzgcQjmh+i0kAQhLhrhFiHQg4hug+iUQhXjSgkiYIgHgeQgdg9gWg+QgaBPgvBZQg6BuhNBtIgVA+QiKGSkCFmQj7FclVERQgXATgYAGQgeAGgMgTQgLgRALgjQAnh3BiiFQgEgIAAgOQgBhqAQhwQg2Aig4AeIgYAhQjXExi6GNQiUE5ieG2IgdAFQgbhIABhxQACkkCClFQA2iHBRiYIAmhFIh4BXQADgiARgnQALgbAYgpQBChtBchvQhYBBg2AhQhSAyhLAWQgTAGgPgBQgTgCgIgMQgLgRAOgiQA8iIB4iGQBXhhCXiCQF9k7C4ilQBnhdBYhaIgSASQh8B5kHDeQiNB3hIA6Qh3BhhjBIQgfAXgVAMQgdARgbAGQggAGgegIQgggKgRgYQgUgdAHgpQAGgjAWglQAcguAugwQAfgfA6gzIGHlGQDrjECRiOQBphmA/hRQBShqAphqIAQgqQAJgXAMgQQAOgTATgLQAVgLAVACQAiAEAbAmQAaAkAIAyQAGAtgKAwQgJAqgXAuQgRAkgdAuQgVAhgXAgIAjgxQAxhIAZg2QAhhJAEhCIABgxQABgdAEgTQAFgZAPgTQAQgWAWgGQAggJAhAYIAJAIIAAgLQACgXALgSQAMgUATgGQAjgNArAiQA8AvAcBYQAMgKAPgFQAJgDAJAAQAbgkAzgFQApgEAdATQATgGATADQAXAEATASQARARAKAYQAIAUAEAbIAFAxQADAlAFAlQArACA2AiQAnAZArAlIAEgLQAJgVAUgMQAegRAqAEQBogYCEBQQBXA0BYBWQA+A9BZBoQDuEaDNE1QBNA3BGBPQBZBmBQCWQBuDLBSECQBBDPA6EYQAxDtATCwQAZDhgQDAQgFBBgMAsQgQA6ggAmQhojohJl4gAwhjSIgxB5QgfBKgeBAIBqh+QCTiuB4i7QiBB+iGBmg");
	this.shape_1.setTransform(203.6892,131.3052);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(57).to({_off:true},1).wait(57));

	// face
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFC3C3").s().p("EgH2An2QlCiTk3kRQj7jckXlQQh+iYhDhqQheiWgjiMQgbhrgDiWQACitgBhXQAAhygLimIgSkXQgUlSAjjaQAxk7C4lVQCEj0EAlbQDFkLCSirQBThiA8g2QBVhNBWglQAygWBCgQQAsgKBMgMQDkgkCpgLQDWgPC3ASQDRAVC0BDQDFBICVB6QBrBYBpCHQBGBaBrClQEcGxCJEpQDDGkAdF5QAIBlgDCBQgBBJgICcQgQFXgPDUQgODOgWB5QggCzhDCDQhMCYiZCVQheBbjHCcIqiIOQijCAheA5QiWBciJAdQhIAPhNAAQjeAAkMh6g");
	this.shape_2.setTransform(205.3027,267.1701);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(57).to({_off:true},1).wait(57));

	// neck
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E0ACAC").s().p("EADvAmUQjTgHhogHQiugLiLgWQh0gRiJggQhmgXiVgoQnHh5q4jVQhoghgygTQhVggg9goQhJgugxg/QgNgSgLgSQgQALgLAMQgSAUgMAjQgHATgMApQgbBLg5A5Qg5A6hKAZQhMAZhQgOQhRgPg8gyQg8gxgihQQgfhJgFhWQgIiDAxh+QAyh+BfhaQBihdCihCQBFgcDjhHQKMjMJClsQBwhHBCg2QBchLA3hRQA/hdAmiGQAUhHAWh/IgFg0Qgck7gnk7QgbjagEhhQgGiwAkiHQA1jCCai3QDEjqEdiBQEfiDEuANQDWAJCEBVQB7BPBXCnQAtBXBRDhQAXBCBgD5IAQApQANgFAOgCQBTgOBIBKQA9BAAeBjQAxCkABEeIABDmQADCDAPBhQA2FuECEyQD7EoFnCMQBUAhCrA+QCRA8BPBSQBUBYAvCPQAgBgAbCsQAcC2gFBuQgHCihKBrQhCBeh+A/QhcAtiXAnQoUCHquAYQiLAFi4AAQlvAAoigUg");
	this.shape_3.setTransform(156.3567,522.1704);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(57).to({_off:true},1).wait(57));

	// hair_back
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C3A16A").s().p("EAXnA4mQgFgyANhGQAHgpAOgzQg5AJhAAHQjDAShiAKQjpAZmuBQQnGBUjPAZQlzAtksgXQlngbkjh9QiYhBhmhUQARBLgQAyQgKAigbAVQgbAXgegFQgWgDgUgSQgRgQgMgZQgJgTgIgcIgNgyQgKglgSgxIghhUIgNglIgKgCIgaABQAHA0AGA0QAFA0AAAaQAABbgxB8QgJAXgMADQgLAEgLgKQgIgIgHgPQgZg4gMhRQgFgggKhxQgDglgOh5IgFgoQgNgLgMgCIgGAAIAFAzQAHBPgCAyQgHB5g0BlQgNAbgRADQgVAEgTgkQggg7gOhYQgHgqgKhzQgQjCgrkcIAAAAQAIBUADAwQAHBhgDBNQgFDFg9COQgGAPgKAJQgLAKgLgFQgHgEgHgSQglhvgNh0QgFgrgGiAQgJiugRiqQAAAygEAqQgLB2gnBaQgGAPgIABQgLABgHgSQhEiXgejdQgFgjghlkQgSjEggjCQgPBCgUA8QgWgEgPgqQg7irgIjXQgDhDABhpQACkQAFjBQg+jKAAjyQAAg2ADg3QAOj+BRlFQAeh4AbhWQAjhuAphYIAJgQQgehJgHhTQgHhZAYh0QANhCAZhPQARg2AehYQBfkKBTioQAeg+Agg5QgDgUAEgYQAEgWALgiQBDjRBnjAQBojBCFimQCPi1C5ibQBAg2BBgvQAQg0Awg7QBNhdBwhOQBbhAB/g/QCKhEBwgdQBhgaBYABQAngBAkAFQCGASB5BQQCBgCBFAFQB8AHBgAeQBJAXAtAjQAoAcAiAuQAdgkAfgdQBxhkC7gcQClgYBxA1QBDAgAwA7IARAXQCLgOB5AeQB0AcB8BKQBfA4B7BkQByBbA/BLQAqAxAdAyIAZARQBJA3BUBoQEWFcCXGhQA0CQAiCRQBeBtBcCrQCSEOBaEtQBcEtAfE4QARC1gICTQAFATAEAcIAnEIQASB2AGBAQALBmAABSQgCCmguCrIgSA7QApD+gVEeQgYFZh8GkQg4C9g3B5QhLCjhkBoQgMAMgMAGQgPAGgKgIQgRgNAKgnQAWhWBDjqQgKACgKAAIiYG3QgqB4gaBEQgfBQgcAzQgmBEguAqQgZAZgTgKQgRgJgBglQgEidA3jAIARg4QgMgDgMgGQgbgNgRgcIgFgLIhQC8QggBNgTAmQgeA+geAuQgiAxgtAuQgaAagVAIQggAMgWgTQgVgTAAgzQABgsALgtQAJgnAehKQAZg8BUjFQgYAEgTgJQgUBzgmBuQgTA1gbAfQgjAngmgHQgUgDgPgPIghAOIgUA2QgqBugwBUQguBQgsAmQgkgpgHhDg");
	this.shape_4.setTransform(198.0225,256.3227);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(57).to({_off:true},1).wait(57));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-164.6,-116.7,679.7,886.1);


(lib.sunsglow = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.suns();
	this.instance.setTransform(334.35,317.95,1,1,0,0,0,142.3,180);
	this.instance.shadow = new cjs.Shadow("rgba(24,116,255,1)",0,0,123);

	this.instance_1 = new lib.glow();
	this.instance_1.setTransform(326.1,326.1,1,1,0,0,0,326.1,326.1);
	this.instance_1.filters = [new cjs.BlurFilter(255, 255, 1)];
	this.instance_1.cache(-2,-2,656,656);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-128,-128,912,912);


(lib.backsandhill = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.johnnyfromback("synched",0);
	this.instance.setTransform(1027.6,186.15,1.7188,1.7188,0,0,0,66.7,37.2);

	this.instance_1 = new lib.girlfromback("synched",0);
	this.instance_1.setTransform(746.55,137,1.5025,1.5025,0,0,0,52.6,83.7);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#75483A").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape.setTransform(896.4285,404.1188);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1792.9,684.1);


(lib.backgroundgraphic = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ground
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#250B0D").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg4gLQh0gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDNlcQBLh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuIi6A6QmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape.setTransform(909.2285,820.1688);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#250B0D").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_1.setTransform(909.2285,820.1688);
	this.shape_1._off = true;

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#663237").s().p("EATvAruQi3gDiSgJQlMgUnRhJQoPhZkIgpQtciGxBhCQp/gn0ogoQnEgNjmgPQl6gZksgyQiGgXj7g1QkFg4h7gWQkEgtl4gkQjVgUmqglQisgRhpgUIg3gLQh1gahegnQiJg4hlhZQhvhig0h7QgihTgMhtQgJhPACh6QAJpUCWoNQB5mmDOlcQBKh+BVh1QA2hJArgrQA6g6A+gcQAjgPAkgBQOtl+RAk+QPEkYSDj7QESg8C6gjQD7gvDUgbQE4gnGEgOQEAgJG/gBQengEU+BgQcBCAW6FTQITB7KQC/QGGBxMQDzILIDdIAiAMIDEAyQCdAnBfAnQCFA2BfBTQBrBfAoB2QAWA+AGBSQADAzgBBhIgOPmQgEEbgYCXQgmDuhrCgQiFDHkVCGQifBMlnBuQhbAbhfAfQmuCJoPDEQiaA6vPF4Qi5BHhlAgQihA0iHASQhSAMhoAEQg+ACh9AAMgvXAAAQjbAAhtgBg");
	this.shape_2.setTransform(909.2285,820.1688);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[]},1).wait(7));
	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1).to({_off:false},0).wait(181).to({_off:true},1).wait(8));

	// moon
	this.instance = new lib.moon("synched",0);
	this.instance.setTransform(386.8,688.6,1,1,-29.9992,0,0,53.8,58.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(90).to({_off:false},0).wait(1).to({regX:54.1,regY:58.6,rotation:-29.6992,x:391.65,y:680.95},0).wait(1).to({rotation:-29.3992,x:396.2,y:673.4},0).wait(1).to({rotation:-29.0992,x:400.8,y:665.85},0).wait(1).to({rotation:-28.7992,x:405.45,y:658.35},0).wait(1).to({rotation:-28.4992,x:410.15,y:650.9},0).wait(1).to({rotation:-28.1992,x:414.9,y:643.5},0).wait(1).to({rotation:-27.8993,x:419.65,y:636.1},0).wait(1).to({rotation:-27.5993,x:424.5,y:628.7},0).wait(1).to({rotation:-27.2993,x:429.35,y:621.35},0).wait(1).to({rotation:-26.9993,x:434.25,y:614.05},0).wait(1).to({rotation:-26.6993,x:439.25,y:606.8},0).wait(1).to({rotation:-26.3993,x:444.2,y:599.55},0).wait(1).to({rotation:-26.0993,x:449.3,y:592.3},0).wait(1).to({rotation:-25.7993,x:454.35,y:585.15},0).wait(1).to({rotation:-25.4993,x:459.5,y:578.05},0).wait(1).to({rotation:-25.1993,x:464.65,y:570.9},0).wait(1).to({rotation:-24.8993,x:469.8,y:563.85},0).wait(1).to({rotation:-24.5993,x:475.15,y:556.85},0).wait(1).to({rotation:-24.2994,x:480.4,y:549.85},0).wait(1).to({rotation:-23.9994,x:485.75,y:542.9},0).wait(1).to({rotation:-23.6994,x:491.2,y:535.9},0).wait(1).to({rotation:-23.3994,x:496.6,y:529.05},0).wait(1).to({rotation:-23.0994,x:502.1,y:522.2},0).wait(1).to({rotation:-22.7994,x:507.6,y:515.35},0).wait(1).to({rotation:-22.4994,x:513.2,y:508.55},0).wait(1).to({rotation:-22.1994,x:518.8,y:501.75},0).wait(1).to({rotation:-21.8994,x:524.45,y:495},0).wait(1).to({rotation:-21.5994,x:530.15,y:488.35},0).wait(1).to({rotation:-21.2994,x:535.9,y:481.65},0).wait(1).to({rotation:-20.9994,x:541.7,y:475},0).wait(1).to({rotation:-20.6994,x:547.5,y:468.45},0).wait(1).to({rotation:-20.3995,x:553.4,y:461.85},0).wait(1).to({rotation:-20.0995,x:559.35,y:455.35},0).wait(1).to({rotation:-19.7995,x:565.3,y:448.85},0).wait(1).to({rotation:-19.4995,x:571.3,y:442.4},0).wait(1).to({rotation:-19.1995,x:577.35,y:435.95},0).wait(1).to({rotation:-18.8995,x:583.5,y:429.55},0).wait(1).to({rotation:-18.5995,x:589.55,y:423.15},0).wait(1).to({rotation:-18.2995,x:595.75,y:416.8},0).wait(1).to({rotation:-17.9995,x:602,y:410.55},0).wait(1).to({rotation:-17.6995,x:608.25,y:404.25},0).wait(1).to({rotation:-17.3995,x:614.55,y:397.95},0).wait(1).to({rotation:-17.0995,x:620.95,y:391.8},0).wait(1).to({rotation:-16.7996,x:627.4,y:385.65},0).wait(1).to({rotation:-16.4996,x:633.8,y:379.55},0).wait(1).to({rotation:-16.1996,x:640.3,y:373.4},0).wait(1).to({rotation:-15.8996,x:646.85,y:367.35},0).wait(1).to({rotation:-15.5996,x:653.4,y:361.3},0).wait(1).to({rotation:-15.2996,x:660.05,y:355.3},0).wait(1).to({rotation:-14.9996,x:666.7,y:349.35},0).wait(1).to({rotation:-14.6996,x:673.4,y:343.4},0).wait(1).to({rotation:-14.3996,x:680.15,y:337.5},0).wait(1).to({rotation:-14.0996,x:687,y:331.6},0).wait(1).to({rotation:-13.7996,x:693.85,y:325.75},0).wait(1).to({rotation:-13.4996,x:700.7,y:319.95},0).wait(1).to({rotation:-13.1996,x:707.65,y:314.2},0).wait(1).to({rotation:-12.8997,x:714.65,y:308.4},0).wait(1).to({rotation:-12.5997,x:721.65,y:302.75},0).wait(1).to({rotation:-12.2997,x:728.7,y:297.1},0).wait(1).to({rotation:-11.9997,x:735.8,y:291.4},0).wait(1).to({rotation:-11.6997,x:743,y:285.9},0).wait(1).to({rotation:-11.3997,x:750.2,y:280.25},0).wait(1).to({rotation:-11.0997,x:757.45,y:274.75},0).wait(1).to({rotation:-10.7997,x:764.7,y:269.2},0).wait(1).to({rotation:-10.4997,x:772.05,y:263.75},0).wait(1).to({rotation:-10.1997,x:779.4,y:258.25},0).wait(1).to({rotation:-9.8997,x:786.8,y:252.9},0).wait(1).to({rotation:-9.5997,x:794.25,y:247.55},0).wait(1).to({rotation:-9.2997,x:801.8,y:242.2},0).wait(1).to({rotation:-8.9998,x:809.35,y:236.9},0).wait(1).to({rotation:-8.6998,x:816.95,y:231.55},0).wait(1).to({rotation:-8.3998,x:824.55,y:226.35},0).wait(1).to({rotation:-8.0998,x:832.25,y:221.15},0).wait(1).to({rotation:-7.7998,x:840,y:215.95},0).wait(1).to({rotation:-7.4998,x:847.75,y:210.85},0).wait(1).to({rotation:-7.1998,x:855.55,y:205.7},0).wait(1).to({rotation:-6.8998,x:863.45,y:200.65},0).wait(1).to({rotation:-6.5998,x:871.35,y:195.6},0).wait(1).to({rotation:-6.2998,x:879.3,y:190.55},0).wait(1).to({rotation:-5.9998,x:887.3,y:185.6},0).wait(1).to({rotation:-5.6998,x:895.3,y:180.65},0).wait(1).to({rotation:-5.3999,x:903.4,y:175.75},0).wait(1).to({rotation:-5.0999,x:911.55,y:170.85},0).wait(1).to({rotation:-4.7999,x:919.7,y:166},0).wait(1).to({rotation:-4.4999,x:927.95,y:161.15},0).wait(1).to({rotation:-4.1999,x:936.2,y:156.4},0).wait(1).to({rotation:-3.8999,x:944.5,y:151.6},0).wait(1).to({rotation:-3.5999,x:952.85,y:146.95},0).wait(1).to({rotation:-3.2999,x:961.2,y:142.25},0).wait(1).to({rotation:-2.9999,x:969.7,y:137.55},0).wait(1).to({rotation:-2.6999,x:978.15,y:133},0).wait(1).to({rotation:-2.3999,x:986.65,y:128.4},0).wait(1).to({rotation:-2.0999,x:995.25,y:123.8},0).to({_off:true},1).wait(7));

	// sky
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBXhUBVgyQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QABA7gCAyIhRgZQAFAoAAApQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_3.setTransform(877.2538,425.4544);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_4.setTransform(877.2538,425.4544);
	this.shape_4._off = true;

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#504541").s().p("Egr/BB0QnogbvfhNQqTgzlIgdQokgym0g5Qm2g5kbhDQmFhdkoiXQhaguhCgsQhRg2g6g7Qh0h3gvieIgJgiIgUAhQgSgngNguQgghrgPjEQhWxpi+0IIhep1Qg2lxggkGQhXrMAIonQACilAOhsQATiVAuhzQAohlBNhvQAxhGBkh9QDCjuEylsQBkh3A5g5IAMgMQBWhVBWgxQBrg+CQgeQBygYCbgHQEMgLFpAjQDSAVGhAzQJ/BIMjAWQHiAOPEAAQO1ABH0gEQMkgFKGgSQLzgUDHAAQIbgBGcAuQCmASDhAkQB3ATCHAYQIbBgBoAQQK+BuN3AjQIaAVQkABIcCACQB6AABBAJQBnAOBHAqQB0BGA8CdQAtB1ARC1QAqHLgyKQQgMChgmGOQghFkgODKQgJCQgXHeQgSGDgWDrQhBLKjDHoQhKCvgiBYQg8CagQB2QgMBVACC6QAAA7gBAyIhRgZQAFAnAAAqQAACNg+B7Qg8B5huBaQhsBYiEAmQAZC3hfCsQhfCtioBNQh3A2ilAJQhdAFjMgLQlBgTmRgGQjxgEnigBQmrgBjVADQlkAFkbATQjxAQlMAlQl9Asi/AVQkcAgliAjIqAA8QuVBVnOAhQsnA6qUAFIh3AAQpkAArugqg");
	this.shape_5.setTransform(877.2538,425.4544);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3}]}).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_5}]},1).to({state:[]},1).wait(7));
	this.timeline.addTween(cjs.Tween.get(this.shape_3).to({_off:true},1).wait(53).to({_off:false},0).wait(128).to({_off:true},1).wait(8));
	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1).to({_off:false},0).wait(52).to({_off:true},1).wait(137));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1805.7,1100.1);


(lib.background2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ground_moves
	this.instance = new lib.groundtomove("synched",0);
	this.instance.setTransform(976.2,228.1,1,1,0,0,0,976.2,228.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({y:229.45},0).wait(1).to({y:230.8},0).wait(1).to({y:232.15},0).wait(1).to({y:233.5},0).wait(1).to({y:234.8},0).wait(1).to({y:236.15},0).wait(1).to({y:237.45},0).wait(1).to({y:238.75},0).wait(1).to({y:240},0).wait(1).to({y:241.3},0).wait(1).to({y:242.55},0).wait(1).to({y:243.8},0).wait(1).to({y:245.05},0).wait(1).to({y:246.25},0).wait(1).to({y:247.5},0).wait(1).to({y:248.7},0).wait(1).to({y:249.9},0).wait(1).to({y:251.1},0).wait(1).to({y:252.25},0).wait(1).to({y:253.4},0).wait(1).to({y:254.55},0).wait(1).to({y:255.7},0).wait(1).to({y:256.85},0).wait(1).to({y:257.95},0).wait(1).to({y:259.05},0).wait(1).to({y:260.15},0).wait(1).to({y:261.25},0).wait(1).to({y:262.35},0).wait(1).to({y:263.4},0).wait(1).to({y:264.45},0).wait(1).to({y:265.5},0).wait(1).to({y:266.5},0).wait(1).to({y:267.55},0).wait(1).to({y:268.55},0).wait(1).to({y:269.55},0).wait(1).to({y:270.55},0).wait(1).to({y:271.5},0).wait(1).to({y:272.5},0).wait(1).to({y:273.45},0).wait(1).to({y:274.4},0).wait(1).to({y:275.3},0).wait(1).to({y:276.25},0).wait(1).to({y:277.15},0).wait(1).to({y:278.05},0).wait(1).to({y:278.95},0).wait(1).to({y:279.8},0).wait(1).to({y:280.7},0).wait(1).to({y:281.55},0).wait(1).to({y:282.4},0).wait(1).to({y:283.25},0).wait(1).to({y:284.05},0).wait(1).to({y:284.85},0).wait(1).to({y:285.65},0).wait(1).to({y:286.45},0).wait(1).to({y:287.25},0).wait(1).to({y:288},0).wait(1).to({y:288.75},0).wait(1).to({y:289.5},0).wait(1).to({y:290.25},0).wait(1).to({y:291},0).wait(1).to({y:291.7},0).wait(1).to({y:292.4},0).wait(1).to({y:293.1},0).wait(1).to({y:293.8},0).wait(1).to({y:294.45},0).wait(1).to({y:295.1},0).wait(1).to({y:295.75},0).wait(1).to({y:296.4},0).wait(1).to({y:297.05},0).wait(1).to({y:297.65},0).wait(1).to({y:298.25},0).wait(1).to({y:298.85},0).wait(1).to({y:299.45},0).wait(1).to({y:300},0).wait(1).to({y:300.55},0).wait(1).to({y:301.1},0).wait(1).to({y:301.65},0).wait(1).to({y:302.2},0).wait(1).to({y:302.7},0).wait(1).to({y:303.2},0).wait(1).to({y:303.7},0).wait(1).to({y:304.2},0).wait(1).to({y:304.7},0).wait(1).to({y:305.15},0).wait(1).to({y:305.6},0).wait(1).to({y:306.05},0).wait(1).to({y:306.45},0).wait(1).to({y:306.9},0).wait(1).to({y:307.3},0).wait(1).to({y:307.7},0).wait(1).to({y:308.1},0).wait(1).to({y:308.45},0).wait(1).to({y:308.85},0).wait(1).to({y:309.2},0).wait(1).to({y:309.55},0).wait(1).to({y:309.85},0).wait(1).to({y:310.2},0).wait(1).to({y:310.5},0).wait(1).to({y:310.8},0).wait(1).to({y:311.1},0).wait(1).to({y:311.35},0).wait(1).to({y:311.65},0).wait(1).to({y:311.9},0).wait(1).to({y:312.15},0).wait(1).to({y:312.35},0).wait(1).to({y:312.6},0).wait(1).to({y:312.8},0).wait(1).to({y:313},0).wait(1).to({y:313.2},0).wait(1).to({y:313.4},0).wait(1).to({y:313.55},0).wait(1).to({y:313.7},0).wait(1).to({y:313.85},0).wait(1).to({y:314},0).wait(1).to({y:314.1},0).wait(1).to({y:314.25},0).wait(1).to({y:314.35},0).wait(1).to({y:314.45},0).wait(1).to({y:314.5},0).wait(1).to({y:314.6},0).wait(1).to({y:314.65},0).wait(1).to({y:314.7},0).wait(1).to({y:314.75},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({y:314.8},0).wait(1));

	// suns
	this.instance_1 = new lib.sunsglow("synched",0);
	this.instance_1.setTransform(638.8,232.25,0.7363,0.7363,0,0,0,326.1,325.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regY:326.1,x:643.2,y:226.05},0).wait(1).to({x:647.6,y:219.75},0).wait(1).to({x:652.05,y:213.45},0).wait(1).to({x:656.45,y:207.25},0).wait(1).to({x:660.9,y:201.05},0).wait(1).to({x:665.3,y:194.95},0).wait(1).to({x:669.75,y:188.85},0).wait(1).to({x:674.15,y:182.8},0).wait(1).to({x:678.6,y:176.85},0).wait(1).to({x:683.05,y:170.9},0).wait(1).to({x:687.5,y:165},0).wait(1).to({x:691.95,y:159.15},0).wait(1).to({x:696.4,y:153.35},0).wait(1).to({x:700.85,y:147.6},0).wait(1).to({x:705.3,y:141.9},0).wait(1).to({x:709.8,y:136.25},0).wait(1).to({x:714.25,y:130.6},0).wait(1).to({x:718.75,y:125.05},0).wait(1).to({x:723.2,y:119.5},0).wait(1).to({x:727.7,y:114},0).wait(1).to({x:732.2,y:108.55},0).wait(1).to({x:736.7,y:103.15},0).wait(1).to({x:741.25,y:97.75},0).wait(1).to({x:745.75,y:92.45},0).wait(1).to({x:750.3,y:87.15},0).wait(1).to({x:754.8,y:81.9},0).wait(1).to({x:759.35,y:76.7},0).wait(1).to({x:763.9,y:71.5},0).wait(1).to({x:768.45,y:66.4},0).wait(1).to({x:773.05,y:61.3},0).wait(1).to({x:777.6,y:56.25},0).wait(1).to({x:782.2,y:51.2},0).wait(1).to({x:786.8,y:46.2},0).wait(1).to({x:791.4,y:41.25},0).wait(1).to({x:796,y:36.35},0).wait(1).to({x:800.65,y:31.45},0).wait(1).to({x:805.3,y:26.6},0).wait(1).to({x:809.95,y:21.8},0).wait(1).to({x:814.6,y:17.05},0).wait(1).to({x:819.25,y:12.3},0).wait(1).to({x:823.95,y:7.55},0).wait(1).to({x:828.65,y:2.9},0).wait(1).to({x:833.35,y:-1.75},0).wait(1).to({x:838.1,y:-6.4},0).wait(1).to({x:842.8,y:-10.95},0).wait(1).to({x:847.55,y:-15.55},0).wait(1).to({x:852.3,y:-20.05},0).wait(1).to({x:857.1,y:-24.55},0).wait(1).to({x:861.9,y:-29.05},0).wait(1).to({x:866.7,y:-33.45},0).wait(1).to({x:871.5,y:-37.9},0).wait(1).to({x:876.35,y:-42.25},0).wait(1).to({x:881.2,y:-46.65},0).wait(1).to({x:886.05,y:-50.95},0).wait(1).to({x:890.95,y:-55.25},0).wait(1).to({x:895.8,y:-59.55},0).wait(1).to({x:900.75,y:-63.8},0).wait(1).to({x:905.65,y:-68.05},0).wait(1).to({x:910.6,y:-72.25},0).wait(1).to({x:915.55,y:-76.45},0).wait(1).to({x:920.55,y:-80.6},0).wait(1).to({x:925.55,y:-84.75},0).wait(1).to({x:930.55,y:-88.85},0).wait(1).to({x:935.6,y:-92.95},0).wait(1).to({x:940.65,y:-97},0).wait(1).to({x:945.7,y:-101.05},0).wait(1).to({x:950.8,y:-105.1},0).wait(1).to({x:955.9,y:-109.1},0).wait(1).to({x:961,y:-113.1},0).wait(1).to({x:966.15,y:-117.1},0).wait(1).to({x:971.3,y:-121.05},0).wait(1).to({x:976.5,y:-124.95},0).wait(1).to({x:981.7,y:-128.9},0).wait(1).to({x:986.95,y:-132.8},0).wait(1).to({x:992.2,y:-136.65},0).wait(1).to({x:997.45,y:-140.55},0).wait(1).to({x:1002.75,y:-144.4},0).wait(1).to({x:1008.05,y:-148.2},0).wait(1).to({x:1013.4,y:-152.05},0).wait(1).to({x:1018.75,y:-155.85},0).wait(1).to({x:1024.1,y:-159.65},0).wait(1).to({x:1029.5,y:-163.4},0).wait(1).to({x:1034.95,y:-167.15},0).wait(1).to({x:1040.4,y:-170.95},0).wait(1).to({x:1045.85,y:-174.65},0).wait(1).to({x:1051.35,y:-178.4},0).wait(1).to({x:1056.85,y:-182.1},0).wait(1).to({x:1062.4,y:-185.8},0).wait(1).to({x:1068,y:-189.5},0).wait(1).to({x:1073.6,y:-193.2},0).wait(1).to({x:1079.2,y:-196.85},0).wait(1).to({x:1084.85,y:-200.55},0).wait(1).to({x:1090.5,y:-204.2},0).wait(1).to({x:1096.2,y:-207.85},0).wait(1).to({x:1101.95,y:-211.5},0).wait(1).to({x:1107.7,y:-215.1},0).wait(1).to({x:1113.45,y:-218.75},0).wait(1).to({x:1119.25,y:-222.35},0).wait(1).to({x:1125.1,y:-226},0).wait(1).to({x:1130.95,y:-229.6},0).wait(1).to({x:1136.85,y:-233.2},0).wait(1).to({x:1142.75,y:-236.8},0).wait(1).to({x:1148.7,y:-240.4},0).wait(1).to({x:1154.65,y:-244},0).wait(1).to({x:1160.65,y:-247.55},0).wait(1).to({x:1166.7,y:-251.15},0).wait(1).to({x:1172.75,y:-254.75},0).wait(1).to({x:1178.85,y:-258.3},0).wait(1).to({x:1184.95,y:-261.9},0).wait(1).to({x:1191.1,y:-265.5},0).wait(1).to({x:1197.3,y:-269.05},0).wait(1).to({x:1203.5,y:-272.65},0).wait(1).to({x:1209.75,y:-276.2},0).wait(1).to({x:1216,y:-279.8},0).wait(1).to({x:1222.35,y:-283.4},0).wait(1).to({x:1228.65,y:-286.95},0).wait(1).to({x:1235.05,y:-290.55},0).wait(1).to({x:1241.45,y:-294.15},0).wait(1).to({x:1247.9,y:-297.75},0).wait(1).to({x:1254.35,y:-301.35},0).wait(1).to({x:1260.85,y:-304.95},0).wait(1).to({x:1267.4,y:-308.55},0).wait(1).to({x:1273.95,y:-312.15},0).wait(1).to({x:1280.55,y:-315.75},0).wait(1).to({x:1287.2,y:-319.4},0).wait(1).to({x:1293.85,y:-323.05},0).wait(1));

	// sky
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#544944").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape.setTransform(994.25,-270.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#564A45").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_1.setTransform(994.25,-268.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#584C46").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_2.setTransform(994.25,-267.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#594D48").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_3.setTransform(994.25,-266.075);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#5B4F49").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_4.setTransform(994.25,-264.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#5D504A").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_5.setTransform(994.25,-263.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#5F514B").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_6.setTransform(994.25,-262.125);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#61534C").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_7.setTransform(994.25,-260.775);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#63544D").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_8.setTransform(994.25,-259.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#64554F").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_9.setTransform(994.25,-258.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#665750").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_10.setTransform(994.25,-256.825);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#685851").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_11.setTransform(994.25,-255.525);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#6A5A52").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_12.setTransform(994.25,-254.175);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#6C5B53").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_13.setTransform(994.25,-252.875);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#6E5C54").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_14.setTransform(994.25,-251.525);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#6F5E56").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_15.setTransform(994.25,-250.225);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#715F57").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_16.setTransform(994.25,-248.925);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#736058").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_17.setTransform(994.25,-247.575);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#756259").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_18.setTransform(994.25,-246.275);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#77635A").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_19.setTransform(994.25,-244.925);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#79655C").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_20.setTransform(994.25,-243.625);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#7A665D").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_21.setTransform(994.25,-242.325);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#7C675E").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_22.setTransform(994.25,-240.975);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#7E695F").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_23.setTransform(994.25,-239.675);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#806A60").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_24.setTransform(994.25,-238.325);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#826B61").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_25.setTransform(994.25,-237.025);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#836D63").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_26.setTransform(994.25,-235.725);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#856E64").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_27.setTransform(994.25,-234.375);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#876F65").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_28.setTransform(994.25,-233.075);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#897166").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_29.setTransform(994.25,-231.725);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#8B7267").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_30.setTransform(994.25,-230.425);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#8D7468").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_31.setTransform(994.25,-229.125);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#8E756A").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_32.setTransform(994.25,-227.775);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#90766B").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_33.setTransform(994.25,-226.475);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#92786C").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_34.setTransform(994.25,-225.125);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#94796D").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_35.setTransform(994.25,-223.825);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#967A6E").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_36.setTransform(994.25,-222.525);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#987C6F").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_37.setTransform(994.25,-221.175);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#997D71").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_38.setTransform(994.25,-219.875);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#9B7F72").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_39.setTransform(994.25,-218.525);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#9D8073").s().p("EiVtA2FMAAAhsJMErbAAAMAAABsJg");
	this.shape_40.setTransform(994.25,-217.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).wait(87));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-691.1,1952.5,1294.4);


(lib.johnnyheadtalking = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.johnnymouthtalk();
	this.instance.setTransform(127.7,236.85,1,1,0,0,0,27.2,19.4);

	this.instance_1 = new lib.johnnyeyes();
	this.instance_1.setTransform(116.6,164.35,1,1,0,0,0,64.3,16.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4C331F").s().p("AwLRFQgagzAIhLQADgZAHgiIgBABQgcgkgMg2QgJgngDg+QgFiGAHh/QgJg6gFg6QgwBWg0BQQgbAqgTAYQgdAigeATQAghwA8iDQAihMBJiMIABgiIgFAFQgTAWgpAoQg5A2gmAaQgFgfAGgiQAMhBBChSIAIgKQgFgLgDgOIgBgJIgGALQgcgegEgvQgDgjALgzQAWhjAvhaIAOgZIgPAJQhUAxhNAUQgXAGgFgLQgEgHAGgNQAMgaAigfQAugrBfhGQBbhDAsgeQBMg1A/glQAjgVAZgIQALgEAKgBIADgKQAJgYAFgKQARgiAlgbQAagSAwgXQCPhECZgvIAogfQB5hdBCgnQAVgLALACQAPADAGASQAEALgDATQgFAdgOAcQCPgbCSgIQBbgEBHAEQBXAGBIAUQA9AQAVAfQAPAUgDAaQgEAbgVAKQANAKAXAOQASgJAbACQAgADAkAPQAaALAmAWQBjA7BMA1QAwAiAdAZQAnAkAYAkQAKAPgDAJQgCAJgRAHQgwARg6gVIgTgIIDcEaQARAUAHANQALAUAAASQACAjglAUQgdAQgZgKQAMAfAIAcIAiAtQAUAdADAgQADAlgYATIgHAFIAEAfIAFA8IAFAGQAqA4AkBQQAWAzAiBhQAJAYADANQAFAWgDARQgFAagQAFQgOAFgUgLQgjgVgagtQgRgcgVg6IgXhCIgEAHIABAGQAFAgABARQABAQAABDQAAB8gBAQQgEBPgQA6QgGAXgNAEQgPAFgMgPQgGgHgFgUQgRhKAAh1QAAisgCgVQgDg0ABgTIABgNQgQgWgNgbQAQBrgXBdQgGAWgMABQgNACgKgYQgVgxg/iyIgBABQgaAKgjgpQgsg1gWghIgHgLQgggRgigbQgegXgxgvIgCgCIgDABQgXACgYAAIAXAMQBEAsApAqQgZAfg+gIQhNgKhQgqIgBAAQg2gMg3gjIgUgNIACAEQAQAZARAPQARAPAFAHQAEAHAAAJQAAAIgGAGQgGAGgQAAIgNgBIA4AxQguAXg+gWQgWgIgbgQIgvgeIibhfIgzggIABADQABAIgEAGQgIALgZgFQiTgchjhMQg/gwhGhcQgtg7gshFIAAAIQAHCchQDEQgyB2hCBpQggAygaAaQgYAYgfARQgLAigNAcQgNgQgIgVIgBgEIgbAHQgEA3gKAwIgBBEQgBA9gGAoIgDATQAZBJA2B7QAKAXAEANQAHAVABASQAAAVgJARQgKATgRAIQgWAJgagLQgWgJgTgVQgTgTgQgbIgHA5QgKBcgTAxQgGARgKADIgGABQgNAAgKgVgAtQCHIgBADQgOAbgNAVQAGA9ABAzIAOgZIADgFIAAgEQAAg/ALhHIgHAFgArDhAQgSBCgPBFIAihBQBMiXAliDQAVhNAMhQQg3C/hcCygAggkrIAQANQApAlAZAdQAoAvgNAjQgFAMgLAJIBLAuIAqAbQg0hJhChrIg1hZQgQAMgXACgAFNkWQgQAEgQADIA1ApQA5AqBUAvIAeARQhThVhKhTQgOAJgVAFgAKyjrIAaAaIglg5Qg6gqg1ggQBCAyA4A3gAvUjxIAAAHIAEgJIgEACg");
	this.shape.setTransform(105.1396,118.2257);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4C331F").s().p("Ah4KBQgLgIgJgRIgBgDIgEABQgLABgKgGQgNgIgLgaQgHgSgJghQgLgpAMgTIADgEQABgFADgGQAGgIAKgFIACAAIABgGQgtAjgRA1QgZAMgZgUQgYgUAFgbQgGASgQALQgRAKgSgBQgSgBgPgNQgOgMgEgSQgUAEgUgHQgVgHgMgQQgNgQgCgWQgCgVAJgSQgiACgTgCQgdgDgTgNQgXgPgNggQgJgWgGgmQgRAAgOgOQgNgMgFgSQgHgZAHguQAHgpAVgGQAIgCAKAEIgIgHIgXgcIgIgKIgDAJQgHAQgNAAQgIAAgGgGQgGgFgDgIQgDgKABgVIAAglIgigsQgQgVgKgLQAeA+AQBKQgOAFgRgEQgQgEgMgLQgTgQgPgkQgRgvgHgMIgNgUQgHgNgDgJQgDgMADgMQADgMAKgGQAIgFAKABIgEgIQgFgOgIgaIgNgKQgZgTgPgWQgRgZABgaQABgOAHgJQAJgLAMAEQAKADADAOQACAIABAPQADAOAMAPIADgVIACgpIACghQgGAAgIgHQgSgRgFgJQgMgRgCgZQgBgRACgeQACgOAEgEQAEgEAMgDIAFgBQAKAAAIAJQAHAJABALQACAIgBAOIAAAVQAAAIAFAXIAEAUQAEgBAFAEQAGAEAEAHQAHALAGAPQgEgOgFgcQgFgegEgNIgGgXQgDgOACgKQACgMAKgIQAKgJALAEQALAFAJAVQAYBAAFAjQAJA0gNAyQgbgMgQgfQAHATAHAZQAUBEACAhIABAMQAVALAHALQgJAAgTgMIAAAaIAYAgQAQAWAOAHIAEACQgJgVgKghQgIgbgCgNQgFgfAFghQADgPAFgIQAJgMAMACQALACAGAOQAFAKABASIACAWIAAgBQAEgLAKgGQAKgGAJAFQAIAEAFAPIAiBgQANgCAMAIQAMAHAHANQALATAAAiQAAAfgEAXQgBALgDAHIAKA3IAHAmIAGAFQAOAOABAnIAGCaQALAJAWgLQAcgPAKAAQATAAAJAWQAIARAAAZQABgQASgGQASgGAOAJQAXAQADAqIABAiQACATAFAMIAmhJQAGgNAHgHQgQgNgNgUQgggFgWgYQgKgNgNgbIgCgEIgEAEQgIAFgLgCQgdgDgRgXQgHgKgHgSQgMgggFgmQgCgRADgKQAFgQAOgDIADAAIgBgHQgDgcAFggQABgJADgGQACgFAEgCQgMgZgHgeQgGgegEg4QgCgbAKgLQAHgGAJgCQAKgBAIAEQAQAGAJAUQAIAPAFAaQAKAqACAXQACAkgLAbQgEAKgHAHQgIAHgJgDQgDgBgFgEQgCAUABAVQABAQgDAHQgCAEgDADIABABQAGAHAIASIAOAbIAAAAQADgHAHgEQAGgEAHABQANAAAJANIAMAYQAGAOAPAWIAIAMQAHgHAKgBQAPgBAQAMQAIAHANASIAkAxQAVAbACASQABANgHAMQgHAMgNABIgCAAIABAFQABAKgBAVQgCAUACALIA0hAQANgRALgBQAMgCAJALQAJAKACAOIABAHIAEACQAOAJAKAQQALgNAJgWQgHAAgGgFQgIgFgFgKQgMgaACgpIAIg6QgCAMgGAJQgJANgMAAQgXACgPgjQgchEAUhAQAHgWAMgGQAIgEAJABQAJABAGAGQAGAGAEAOQAIAZAGA2QACAfgBAQQACgWAHgHQAFgGAJgBQAIgBAHAEQAHAGAEALQACAGABAOIAFAjQADAVABAOIAAAKIAHgIQAJgHAKgCQAMgCAIAFQAJAHAEAUIAEASQABgRAFgPIAFgVIAAgLQAAgGACgFQAEgIAKgBQAKgCAGAGQAEAGADAMIAEAQIABgVQABgPAFgEQAEgEAHAAQAGABADAEQAEAEABALIACATQAKgIALgBQAOAAAMALQAJAJAEANQAEgMAFgMQADgJAGgDIADgBIAGgeIAMg0QADgNAFgFQAIgLANAFQALADAHAPIAGgeIAIggQAGgSAKgKQAKgJAIABQAMACAEASQADAQgFAYIgHAoIAAARIgCAQQgFAYgVAOQgJgFgHgJQgBAagJAaIAAABIBAhEQAVgWAQAEIADACIADgIQAEgIAIgEQAIgFAJABIAEAAQgDgFAAgFIgBgQQgFgJABgFIADgHQACgFAFgCIALgCIAFABQALAGAFAMIACAQIABANQABALgDAEQgEAFgLABIACACQAKAQAAAUQgBATgJASQgIARgQAQIAAAMQAQgCAdgcQAbgZATACIADAAIAAgEIANjkQABgVAKgFQAGgEAIACQAHACAGAGQARAOAGAbQAEAPACAjIADA8QAAAigJAYQgIAWgcAlIgDAEIAFABQAJACAEALQAEAKgBALIAAACIA6hOIAJgRIAohGQAJgOAFgFQAIgGAIAAQAFgZACgNIACgeQABgSAFgMQAEgLAJgIQAKgIAKAEQAJADAHAPQAFALADANQANgBAHAKQAKgqgJgqIgBgCQgVgLgMgUQgNgUAAgXQAAgYANgUQAJgQAPgKIACgaQgRAggWgFQgWgDgFghQgDgYAHgiQAJgmADgTIAHg2QAFgfALgUQAGgMAMgHQAMgIALAFQAPAGAEAeQAGAxgEAtIADADQADAGACAOIAJBTQgBhoAFg4QABgUAGgMQAFgHAHgEQAHgFAIACQAUADAEAlQAKBNgDAjQgDBAgeArQgJANgKAAQgHAAgEgGIgCAHQACA/gIApQgGAcgQACIgDAAIgEAWQgGArADAiIADAhQAAASgHANQgHAPgTADQgHABgFgBIgBACQgJAngMASQgHALgLAFQgMAGgKgFIgXAkQgMATgMABQgEABgDgBQgRANgWAEQgIgEADgRIAFgSIgvA8IgIAWQgGAOgQAcIgYAmQgOAVgPANQgKAIgHgCQgIgDgCgNQgCgXANgcIASgeQgMgJgFgPQgHgTAGgpQgUgCgaAiQgVAcgRAFQgBAKgEAOIgMAmQgKAegQAPQgNANgLgFQgLgFgBgSQAAgNAFgZQAJgsAKgTIAMgZIgCgMQgBgKADgXQACgVgBgMQg0AmgoA0QAEAcgDAWQAOAZAMArQAIAdABATQACAbgKATQgGAKgKAGQgKAHgKgDQgIgCgIgKIgGACQgEACgCACQgRgEgMgLIgLgLIgPgMQACAOgFAIQgFAIgKACQgKACgKgEQgNgFgMgQIgTgcIgSgcQgGgKgGgXQgEgQACgJQgKADgNgGQgUgJgIgTQgHgQABgWQABgNAFgaQgJAIgHAOIgHAMIAAABIgRAqQgGAOgJAKIAJAVQAMAgAEASQAIAcgBAXQAAAQgGAMQgHAOgMAEIgIABQgLAAgLgIgACgIxIgJggIgPg4IgCgKIgFgBQgigJgGg/IgIATIgGALQgBAWgFATQgFARgKAGIAFAJQAEAGAHAGIANALQAVATALAaIACgDQAGgFAHAAQABAAABgBQABAAAAAAQABAAAAgBQAAAAgBgBQAQAGALAFIAAAAgAAKHWIAGgKIgCgKIAAgEIgEAYgAKUEqIgLAWIADACIANgVIgEgGIgBADgAowCgQAAAPgEAGIACADQAEAIABARQABAQADAIQACgHAAgPIAAgjQABgNgDgJIgGgMQgDgHABgFIgBAAIACAegAp3CoQAIAAADgKIABAAQgHgLgFgMIAAAhgAqGA6IgJABQAHAGAIAFIAAgEIAGgbIgDgCQgDAJgGAMgAqlAkQgCgJgBgNQAAgcACgYQgCADgDABIgJgGIAAACQACAQgBAfIgBAGIAPAVIAAAAgAsXh7QAEAPALAQQAKAQAXAaIACADQACgRAEgMIAFgIQgJgCgLgMQgNgNgdgmQgBARACAJgAqphuQAEAXACAXQABgNAEgGQADgFAFgCQAEgCADABQACgHACgEQAIgKACgGQACgGgDgOQgIgagKgZQAAAqgVAlgAtRlvQAAAIABAFIACAJIAAAGIADADQAGAGAGADIACgCIgGgVQgEgNgEgHQgEgGABgDIgDAAIAAAMgAk/DPQgFgKAAgRQAAgeAFgeQACgPAFgGQADgFAGgCQAGgDAFACQAGACAEAHQALAPACAlQACAcgEAQQgGAZgTAJQgSgMgFgLgAJgDBQgHgFgFgJQgFgKgBgZQgCheAehZQANglANgWQAHgKAGgCIADhLQABgMACgEQACgEAEgCQAEgCAEACQAGADABANQADAcABAiQABAegFATQABALgBANIgJAtQgDASgDBIQgDA5gNAhQgKAagSACIgCAAQgHAAgIgEgAlwAnQgOgCgDgXQgHgtAJhYQABgVAMgCQAHgCAGAHQAFAFACAIQADAKACAcQAFBDgIAjQgFAXgOAAIgBAAgACEiBQgCgeAMgdQAHgSARgcQAKgRALAAQAIAAgBgEQAKAEAHAKQAGAKgBALQgBAHgGASQgFAMgFAVIgIAiQgNAqgcAMQgRgXgBgggAJUhMQgGgCgCgIQgHgQgBgRQAAgPAFgYIAHgmQACgNAAgZQAAgZACgNQACgRAGgJQAKgOAOAEQAPAEAGAcQAJAxgIAwQgIAygZApQgJANgIAAIgEgBgAiphQQgKAAgIgPQgUgmABhDQAAg1AHg0QADgVAIgHQAKgKAQAFQAPAEAIANQAHALACARIABAUQAJgIANAAQATgBAKAQQAIAKADAXQAEAfAAAUQgBAbgIAVQgLAbgUADQgQABgMgOIgDgEQgFAPgIAMQgJAOgLAAIgCAAgAjwhbQgWgVgFgQQgCgIAAgMQABgLACgDQADgIAHgCIAGgBQABAAABAAQAAgBABAAQAAAAABgBQAAAAAAgBQAJABAGAHQADAEACAHIAEALIAIAMQACAGgDANQgCAJgDADIgJAHIgCAFQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAIgFgCgAGCh1QgEgLAGgYQAMguAIgQQAMgVAFgLIAIgWQAGgMALgCQANgCAIANQAGAJAAAQQAAATgLAmIgMAoQgIAXgHAMQgKASgQAHQgWgLgFgRgAEPh2QgHgLAAgSQAAgSAJgeQALgiABgOIAEgZQADgPAKgFQALgHALAHQALAHAEAZQADAagCAMQgBAKgGASQgHATgCAJIgCARIgDARQgDAIgFAHQgHAHgIABIgEAAQgMAAgJgNgAAthyQgHgGgFgKQgFgNABgZIAAhVQAAgbAGgMQAEgKAIgGQAJgGAKABQARACAIATQAEAJABAYIADBLQAAAVgBAKQgCARgHALQgLARgPAAIgBAAQgJAAgIgGgAIGh2QgJgEgFgIQgHgMAGgeQAGgaABgmIABgXQACgNAGgIQAJgNAPgDQANAAAJAMQAEAHAEARQAOBJgeAxQgKAPgKAFQgFABgEAAQgFAAgFgBgANslTQgHgHgDgMQgDgRADgZQAGgcACgOQACgMAAgRIABgeQABgbAJgLQAGgHALgDIgDgIQgDgJgBgSQgCgfADgQQAEgOAHgCQAKgDAFAJQAEAGABAMQACAQgCAXQAAAQgEAKIgDAJQAHACAFAFQAMALADAYQADAXgDAaQgGBFgcApQgKAQgLABIgCAAQgIAAgIgIg");
	this.shape_1.setTransform(116.554,228.6361);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E4A985").s().p("AhjS2QibgriJhfQh3hThuh8QhVhhhkiRIgYgiQgUAhgfAOQggAOgmgJQgmgKgSgbQgQgYgDgwQgEg/AEhAIg4gCQghgBgVgHQgVgHgQgQQgRgPgHgUQgKgYACgtQACgrAJgWQAPgkAhgLQAOgFAfgBIAkAAQhHi/AEiuQAGjdB/kIQAqhYArg/QA1hOA+g3QBthgDBhFQEGheDjANQDFALDPBeQDCBYB0B5QA2A5AxBNQAmA8AqBWQBlDJAgCYQAdCIgKCbQAUgEAagBQAxgEAZALQATAJAMARQALARACAUQACAjgZAmIgdAmQgRAVgFASQgEAOAAATIABAgQAAAhgLAZQgNAegZAQQgdASgogFQgXgDgTgJIgWBHQgvCRgxBoQg/CEhQBiQhcBwh4BLQiCBRiOAVQg2AJg3AAQhpAAhtgfg");
	this.shape_2.setTransform(113.1947,158.7883);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.johnnyheadtalking, new cjs.Rectangle(-29.7,6.8,269.8,286.8), null);


(lib.johnnyheadquiet = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.johnnymouthclosed();
	this.instance.setTransform(127.7,236.85,1,1,0,0,0,27.2,19.4);

	this.instance_1 = new lib.johnnyeyes();
	this.instance_1.setTransform(116.6,164.35,1,1,0,0,0,64.3,16.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4C331F").s().p("AwLRFQgagzAIhLQADgZAHgiIgBABQgcgkgMg2QgJgngDg+QgFiGAHh/QgJg6gFg6QgwBWg0BQQgbAqgTAYQgdAigeATQAghwA8iDQAihMBJiMIABgiIgFAFQgTAWgpAoQg5A2gmAaQgFgfAGgiQAMhBBChSIAIgKQgFgLgDgOIgBgJIgGALQgcgegEgvQgDgjALgzQAWhjAvhaIAOgZIgPAJQhUAxhNAUQgXAGgFgLQgEgHAGgNQAMgaAigfQAugrBfhGQBbhDAsgeQBMg1A/glQAjgVAZgIQALgEAKgBIADgKQAJgYAFgKQARgiAlgbQAagSAwgXQCPhECZgvIAogfQB5hdBCgnQAVgLALACQAPADAGASQAEALgDATQgFAdgOAcQCPgbCSgIQBbgEBHAEQBXAGBIAUQA9AQAVAfQAPAUgDAaQgEAbgVAKQANAKAXAOQASgJAbACQAgADAkAPQAaALAmAWQBjA7BMA1QAwAiAdAZQAnAkAYAkQAKAPgDAJQgCAJgRAHQgwARg6gVIgTgIIDcEaQARAUAHANQALAUAAASQACAjglAUQgdAQgZgKQAMAfAIAcIAiAtQAUAdADAgQADAlgYATIgHAFIAEAfIAFA8IAFAGQAqA4AkBQQAWAzAiBhQAJAYADANQAFAWgDARQgFAagQAFQgOAFgUgLQgjgVgagtQgRgcgVg6IgXhCIgEAHIABAGQAFAgABARQABAQAABDQAAB8gBAQQgEBPgQA6QgGAXgNAEQgPAFgMgPQgGgHgFgUQgRhKAAh1QAAisgCgVQgDg0ABgTIABgNQgQgWgNgbQAQBrgXBdQgGAWgMABQgNACgKgYQgVgxg/iyIgBABQgaAKgjgpQgsg1gWghIgHgLQgggRgigbQgegXgxgvIgCgCIgDABQgXACgYAAIAXAMQBEAsApAqQgZAfg+gIQhNgKhQgqIgBAAQg2gMg3gjIgUgNIACAEQAQAZARAPQARAPAFAHQAEAHAAAJQAAAIgGAGQgGAGgQAAIgNgBIA4AxQguAXg+gWQgWgIgbgQIgvgeIibhfIgzggIABADQABAIgEAGQgIALgZgFQiTgchjhMQg/gwhGhcQgtg7gshFIAAAIQAHCchQDEQgyB2hCBpQggAygaAaQgYAYgfARQgLAigNAcQgNgQgIgVIgBgEIgbAHQgEA3gKAwIgBBEQgBA9gGAoIgDATQAZBJA2B7QAKAXAEANQAHAVABASQAAAVgJARQgKATgRAIQgWAJgagLQgWgJgTgVQgTgTgQgbIgHA5QgKBcgTAxQgGARgKADIgGABQgNAAgKgVgAtQCHIgBADQgOAbgNAVQAGA9ABAzIAOgZIADgFIAAgEQAAg/ALhHIgHAFgArDhAQgSBCgPBFIAihBQBMiXAliDQAVhNAMhQQg3C/hcCygAggkrIAQANQApAlAZAdQAoAvgNAjQgFAMgLAJIBLAuIAqAbQg0hJhChrIg1hZQgQAMgXACgAFNkWQgQAEgQADIA1ApQA5AqBUAvIAeARQhThVhKhTQgOAJgVAFgAKyjrIAaAaIglg5Qg6gqg1ggQBCAyA4A3gAvUjxIAAAHIAEgJIgEACg");
	this.shape.setTransform(105.1396,118.2257);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4C331F").s().p("Ah4KBQgLgIgJgRIgBgDIgEABQgLABgKgGQgNgIgLgaQgHgSgJghQgLgpAMgTIADgEQABgFADgGQAGgIAKgFIACAAIABgGQgtAjgRA1QgZAMgZgUQgYgUAFgbQgGASgQALQgRAKgSgBQgSgBgPgNQgOgMgEgSQgUAEgUgHQgVgHgMgQQgNgQgCgWQgCgVAJgSQgiACgTgCQgdgDgTgNQgXgPgNggQgJgWgGgmQgRAAgOgOQgNgMgFgSQgHgZAHguQAHgpAVgGQAIgCAKAEIgIgHIgXgcIgIgKIgDAJQgHAQgNAAQgIAAgGgGQgGgFgDgIQgDgKABgVIAAglIgigsQgQgVgKgLQAeA+AQBKQgOAFgRgEQgQgEgMgLQgTgQgPgkQgRgvgHgMIgNgUQgHgNgDgJQgDgMADgMQADgMAKgGQAIgFAKABIgEgIQgFgOgIgaIgNgKQgZgTgPgWQgRgZABgaQABgOAHgJQAJgLAMAEQAKADADAOQACAIABAPQADAOAMAPIADgVIACgpIACghQgGAAgIgHQgSgRgFgJQgMgRgCgZQgBgRACgeQACgOAEgEQAEgEAMgDIAFgBQAKAAAIAJQAHAJABALQACAIgBAOIAAAVQAAAIAFAXIAEAUQAEgBAFAEQAGAEAEAHQAHALAGAPQgEgOgFgcQgFgegEgNIgGgXQgDgOACgKQACgMAKgIQAKgJALAEQALAFAJAVQAYBAAFAjQAJA0gNAyQgbgMgQgfQAHATAHAZQAUBEACAhIABAMQAVALAHALQgJAAgTgMIAAAaIAYAgQAQAWAOAHIAEACQgJgVgKghQgIgbgCgNQgFgfAFghQADgPAFgIQAJgMAMACQALACAGAOQAFAKABASIACAWIAAgBQAEgLAKgGQAKgGAJAFQAIAEAFAPIAiBgQANgCAMAIQAMAHAHANQALATAAAiQAAAfgEAXQgBALgDAHIAKA3IAHAmIAGAFQAOAOABAnIAGCaQALAJAWgLQAcgPAKAAQATAAAJAWQAIARAAAZQABgQASgGQASgGAOAJQAXAQADAqIABAiQACATAFAMIAmhJQAGgNAHgHQgQgNgNgUQgggFgWgYQgKgNgNgbIgCgEIgEAEQgIAFgLgCQgdgDgRgXQgHgKgHgSQgMgggFgmQgCgRADgKQAFgQAOgDIADAAIgBgHQgDgcAFggQABgJADgGQACgFAEgCQgMgZgHgeQgGgegEg4QgCgbAKgLQAHgGAJgCQAKgBAIAEQAQAGAJAUQAIAPAFAaQAKAqACAXQACAkgLAbQgEAKgHAHQgIAHgJgDQgDgBgFgEQgCAUABAVQABAQgDAHQgCAEgDADIABABQAGAHAIASIAOAbIAAAAQADgHAHgEQAGgEAHABQANAAAJANIAMAYQAGAOAPAWIAIAMQAHgHAKgBQAPgBAQAMQAIAHANASIAkAxQAVAbACASQABANgHAMQgHAMgNABIgCAAIABAFQABAKgBAVQgCAUACALIA0hAQANgRALgBQAMgCAJALQAJAKACAOIABAHIAEACQAOAJAKAQQALgNAJgWQgHAAgGgFQgIgFgFgKQgMgaACgpIAIg6QgCAMgGAJQgJANgMAAQgXACgPgjQgchEAUhAQAHgWAMgGQAIgEAJABQAJABAGAGQAGAGAEAOQAIAZAGA2QACAfgBAQQACgWAHgHQAFgGAJgBQAIgBAHAEQAHAGAEALQACAGABAOIAFAjQADAVABAOIAAAKIAHgIQAJgHAKgCQAMgCAIAFQAJAHAEAUIAEASQABgRAFgPIAFgVIAAgLQAAgGACgFQAEgIAKgBQAKgCAGAGQAEAGADAMIAEAQIABgVQABgPAFgEQAEgEAHAAQAGABADAEQAEAEABALIACATQAKgIALgBQAOAAAMALQAJAJAEANQAEgMAFgMQADgJAGgDIADgBIAGgeIAMg0QADgNAFgFQAIgLANAFQALADAHAPIAGgeIAIggQAGgSAKgKQAKgJAIABQAMACAEASQADAQgFAYIgHAoIAAARIgCAQQgFAYgVAOQgJgFgHgJQgBAagJAaIAAABIBAhEQAVgWAQAEIADACIADgIQAEgIAIgEQAIgFAJABIAEAAQgDgFAAgFIgBgQQgFgJABgFIADgHQACgFAFgCIALgCIAFABQALAGAFAMIACAQIABANQABALgDAEQgEAFgLABIACACQAKAQAAAUQgBATgJASQgIARgQAQIAAAMQAQgCAdgcQAbgZATACIADAAIAAgEIANjkQABgVAKgFQAGgEAIACQAHACAGAGQARAOAGAbQAEAPACAjIADA8QAAAigJAYQgIAWgcAlIgDAEIAFABQAJACAEALQAEAKgBALIAAACIA6hOIAJgRIAohGQAJgOAFgFQAIgGAIAAQAFgZACgNIACgeQABgSAFgMQAEgLAJgIQAKgIAKAEQAJADAHAPQAFALADANQANgBAHAKQAKgqgJgqIgBgCQgVgLgMgUQgNgUAAgXQAAgYANgUQAJgQAPgKIACgaQgRAggWgFQgWgDgFghQgDgYAHgiQAJgmADgTIAHg2QAFgfALgUQAGgMAMgHQAMgIALAFQAPAGAEAeQAGAxgEAtIADADQADAGACAOIAJBTQgBhoAFg4QABgUAGgMQAFgHAHgEQAHgFAIACQAUADAEAlQAKBNgDAjQgDBAgeArQgJANgKAAQgHAAgEgGIgCAHQACA/gIApQgGAcgQACIgDAAIgEAWQgGArADAiIADAhQAAASgHANQgHAPgTADQgHABgFgBIgBACQgJAngMASQgHALgLAFQgMAGgKgFIgXAkQgMATgMABQgEABgDgBQgRANgWAEQgIgEADgRIAFgSIgvA8IgIAWQgGAOgQAcIgYAmQgOAVgPANQgKAIgHgCQgIgDgCgNQgCgXANgcIASgeQgMgJgFgPQgHgTAGgpQgUgCgaAiQgVAcgRAFQgBAKgEAOIgMAmQgKAegQAPQgNANgLgFQgLgFgBgSQAAgNAFgZQAJgsAKgTIAMgZIgCgMQgBgKADgXQACgVgBgMQg0AmgoA0QAEAcgDAWQAOAZAMArQAIAdABATQACAbgKATQgGAKgKAGQgKAHgKgDQgIgCgIgKIgGACQgEACgCACQgRgEgMgLIgLgLIgPgMQACAOgFAIQgFAIgKACQgKACgKgEQgNgFgMgQIgTgcIgSgcQgGgKgGgXQgEgQACgJQgKADgNgGQgUgJgIgTQgHgQABgWQABgNAFgaQgJAIgHAOIgHAMIAAABIgRAqQgGAOgJAKIAJAVQAMAgAEASQAIAcgBAXQAAAQgGAMQgHAOgMAEIgIABQgLAAgLgIgACgIxIgJggIgPg4IgCgKIgFgBQgigJgGg/IgIATIgGALQgBAWgFATQgFARgKAGIAFAJQAEAGAHAGIANALQAVATALAaIACgDQAGgFAHAAQABAAABgBQABAAAAAAQABAAAAgBQAAAAgBgBQAQAGALAFIAAAAgAAKHWIAGgKIgCgKIAAgEIgEAYgAKUEqIgLAWIADACIANgVIgEgGIgBADgAowCgQAAAPgEAGIACADQAEAIABARQABAQADAIQACgHAAgPIAAgjQABgNgDgJIgGgMQgDgHABgFIgBAAIACAegAp3CoQAIAAADgKIABAAQgHgLgFgMIAAAhgAqGA6IgJABQAHAGAIAFIAAgEIAGgbIgDgCQgDAJgGAMgAqlAkQgCgJgBgNQAAgcACgYQgCADgDABIgJgGIAAACQACAQgBAfIgBAGIAPAVIAAAAgAsXh7QAEAPALAQQAKAQAXAaIACADQACgRAEgMIAFgIQgJgCgLgMQgNgNgdgmQgBARACAJgAqphuQAEAXACAXQABgNAEgGQADgFAFgCQAEgCADABQACgHACgEQAIgKACgGQACgGgDgOQgIgagKgZQAAAqgVAlgAtRlvQAAAIABAFIACAJIAAAGIADADQAGAGAGADIACgCIgGgVQgEgNgEgHQgEgGABgDIgDAAIAAAMgAk/DPQgFgKAAgRQAAgeAFgeQACgPAFgGQADgFAGgCQAGgDAFACQAGACAEAHQALAPACAlQACAcgEAQQgGAZgTAJQgSgMgFgLgAJgDBQgHgFgFgJQgFgKgBgZQgCheAehZQANglANgWQAHgKAGgCIADhLQABgMACgEQACgEAEgCQAEgCAEACQAGADABANQADAcABAiQABAegFATQABALgBANIgJAtQgDASgDBIQgDA5gNAhQgKAagSACIgCAAQgHAAgIgEgAlwAnQgOgCgDgXQgHgtAJhYQABgVAMgCQAHgCAGAHQAFAFACAIQADAKACAcQAFBDgIAjQgFAXgOAAIgBAAgACEiBQgCgeAMgdQAHgSARgcQAKgRALAAQAIAAgBgEQAKAEAHAKQAGAKgBALQgBAHgGASQgFAMgFAVIgIAiQgNAqgcAMQgRgXgBgggAJUhMQgGgCgCgIQgHgQgBgRQAAgPAFgYIAHgmQACgNAAgZQAAgZACgNQACgRAGgJQAKgOAOAEQAPAEAGAcQAJAxgIAwQgIAygZApQgJANgIAAIgEgBgAiphQQgKAAgIgPQgUgmABhDQAAg1AHg0QADgVAIgHQAKgKAQAFQAPAEAIANQAHALACARIABAUQAJgIANAAQATgBAKAQQAIAKADAXQAEAfAAAUQgBAbgIAVQgLAbgUADQgQABgMgOIgDgEQgFAPgIAMQgJAOgLAAIgCAAgAjwhbQgWgVgFgQQgCgIAAgMQABgLACgDQADgIAHgCIAGgBQABAAABAAQAAgBABAAQAAAAABgBQAAAAAAgBQAJABAGAHQADAEACAHIAEALIAIAMQACAGgDANQgCAJgDADIgJAHIgCAFQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAIgFgCgAGCh1QgEgLAGgYQAMguAIgQQAMgVAFgLIAIgWQAGgMALgCQANgCAIANQAGAJAAAQQAAATgLAmIgMAoQgIAXgHAMQgKASgQAHQgWgLgFgRgAEPh2QgHgLAAgSQAAgSAJgeQALgiABgOIAEgZQADgPAKgFQALgHALAHQALAHAEAZQADAagCAMQgBAKgGASQgHATgCAJIgCARIgDARQgDAIgFAHQgHAHgIABIgEAAQgMAAgJgNgAAthyQgHgGgFgKQgFgNABgZIAAhVQAAgbAGgMQAEgKAIgGQAJgGAKABQARACAIATQAEAJABAYIADBLQAAAVgBAKQgCARgHALQgLARgPAAIgBAAQgJAAgIgGgAIGh2QgJgEgFgIQgHgMAGgeQAGgaABgmIABgXQACgNAGgIQAJgNAPgDQANAAAJAMQAEAHAEARQAOBJgeAxQgKAPgKAFQgFABgEAAQgFAAgFgBgANslTQgHgHgDgMQgDgRADgZQAGgcACgOQACgMAAgRIABgeQABgbAJgLQAGgHALgDIgDgIQgDgJgBgSQgCgfADgQQAEgOAHgCQAKgDAFAJQAEAGABAMQACAQgCAXQAAAQgEAKIgDAJQAHACAFAFQAMALADAYQADAXgDAaQgGBFgcApQgKAQgLABIgCAAQgIAAgIgIg");
	this.shape_1.setTransform(116.554,228.6361);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E4A985").s().p("AhjS2QibgriJhfQh3hThuh8QhVhhhkiRIgYgiQgUAhgfAOQggAOgmgJQgmgKgSgbQgQgYgDgwQgEg/AEhAIg4gCQghgBgVgHQgVgHgQgQQgRgPgHgUQgKgYACgtQACgrAJgWQAPgkAhgLQAOgFAfgBIAkAAQhHi/AEiuQAGjdB/kIQAqhYArg/QA1hOA+g3QBthgDBhFQEGheDjANQDFALDPBeQDCBYB0B5QA2A5AxBNQAmA8AqBWQBlDJAgCYQAdCIgKCbQAUgEAagBQAxgEAZALQATAJAMARQALARACAUQACAjgZAmIgdAmQgRAVgFASQgEAOAAATIABAgQAAAhgLAZQgNAegZAQQgdASgogFQgXgDgTgJIgWBHQgvCRgxBoQg/CEhQBiQhcBwh4BLQiCBRiOAVQg2AJg3AAQhpAAhtgfg");
	this.shape_2.setTransform(113.1947,158.7883);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.johnnyheadquiet, new cjs.Rectangle(-29.7,6.8,269.8,286.8), null);


(lib.girlrightarmstopped = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.girlhand3("synched",0);
	this.instance.setTransform(-79.8,33.75,1,1,29.9992,0,0,63.1,50.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:37.6,regY:28,rotation:29.3858,x:-90.9,y:1.5},0).wait(1).to({rotation:28.7724,x:-91.25,y:1.6},0).wait(1).to({rotation:28.159,x:-91.55,y:1.75},0).wait(1).to({rotation:27.5457,x:-91.9,y:1.9},0).wait(1).to({rotation:26.9323,x:-92.25,y:2},0).wait(1).to({rotation:26.3189,x:-92.55,y:2.1},0).wait(1).to({rotation:25.7055,x:-92.9,y:2.3},0).wait(1).to({rotation:25.0921,x:-93.2,y:2.4},0).wait(1).to({rotation:24.4787,x:-93.6,y:2.6},0).wait(1).to({rotation:23.8654,x:-93.9,y:2.7},0).wait(1).to({rotation:23.252,x:-94.25,y:2.9},0).wait(1).to({rotation:22.6386,x:-94.6,y:3},0).wait(1).to({rotation:22.0252,x:-94.9,y:3.15},0).wait(1).to({rotation:21.4118,x:-95.2,y:3.35},0).wait(1).to({rotation:20.7984,x:-95.55,y:3.55},0).wait(1).to({rotation:20.1851,x:-95.85,y:3.65},0).wait(1).to({rotation:19.5717,x:-96.2,y:3.85},0).wait(1).to({rotation:18.9583,x:-96.55,y:4.05},0).wait(1).to({rotation:18.3449,x:-96.8,y:4.25},0).wait(1).to({rotation:17.7315,x:-97.2,y:4.35},0).wait(1).to({rotation:17.1181,x:-97.45,y:4.55},0).wait(1).to({rotation:16.5048,x:-97.75,y:4.8},0).wait(1).to({rotation:15.8914,x:-98.1,y:5},0).wait(1).to({rotation:15.278,x:-98.45,y:5.15},0).wait(1).to({rotation:14.6646,x:-98.7,y:5.35},0).wait(1).to({rotation:14.0512,x:-99.05,y:5.6},0).wait(1).to({rotation:13.4378,x:-99.3,y:5.8},0).wait(1).to({rotation:12.8245,x:-99.6,y:6},0).wait(1).to({rotation:12.2111,x:-99.9,y:6.2},0).wait(1).to({rotation:11.5977,x:-100.2,y:6.45},0).wait(1).to({rotation:10.9843,x:-100.5,y:6.65},0).wait(1).to({rotation:10.3709,x:-100.75,y:6.85},0).wait(1).to({rotation:9.7575,x:-101.05,y:7.05},0).wait(1).to({rotation:9.1442,x:-101.35,y:7.3},0).wait(1).to({rotation:8.5308,x:-101.6,y:7.6},0).wait(1).to({rotation:7.9174,x:-101.9,y:7.8},0).wait(1).to({rotation:7.304,x:-102.15,y:8},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFC3C3").s().p("AFUK6QhcgVhRgxQhSgxg+hHQgggmgig1QgTgegnhDIhzjFQhjirgzhWQhViOhIhvQglg6gOglQgUg4AQgsQAKgdAiglQAwgxApgHQAzgKA8AnQAkAXAlAmQAVAWAqAzIKGMUQA2BCAZAmQAnA8ANA4QAQBCgVA/QgXBDg4AcQgiAQguAAQgiAAgpgJg");
	this.shape.setTransform(-32.872,91.0306);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(120));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-139.3,-35.8,165.10000000000002,197.60000000000002);


(lib.girlrightarmmove = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.girlhand3("synched",0);
	this.instance.setTransform(-74.35,39.05,1,1,29.9992,0,0,69.2,49.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:37.6,regY:28,rotation:28.9278,x:-91.8,y:5.15},0).wait(1).to({rotation:27.8564,x:-92.45,y:5.2},0).wait(1).to({rotation:26.785,x:-93.05,y:5.35},0).wait(1).to({rotation:25.7136,x:-93.65,y:5.5},0).wait(1).to({rotation:24.6422,x:-94.2,y:5.65},0).wait(1).to({rotation:23.5708,x:-94.9,y:5.8},0).wait(1).to({rotation:22.4994,x:-95.45,y:5.95},0).wait(1).to({rotation:21.428,x:-96.05,y:6.15},0).wait(1).to({rotation:20.3566,x:-96.65,y:6.35},0).wait(1).to({rotation:19.2852,x:-97.2,y:6.5},0).wait(1).to({rotation:18.2138,x:-97.75,y:6.75},0).wait(1).to({rotation:17.1424,x:-98.3,y:6.95},0).wait(1).to({rotation:16.071,x:-98.85,y:7.15},0).wait(1).to({rotation:14.9996,x:-99.4,y:7.45},0).wait(1).to({rotation:13.9282,x:-99.95,y:7.7},0).wait(1).to({rotation:12.8568,x:-100.45,y:7.9},0).wait(1).to({rotation:11.7854,x:-100.95,y:8.2},0).wait(1).to({rotation:10.714,x:-101.45,y:8.5},0).wait(1).to({rotation:9.6426,x:-102,y:8.75},0).wait(1).to({rotation:8.5712,x:-102.4,y:9.05},0).wait(1).to({rotation:7.4998,x:-102.9,y:9.35},0).wait(1).to({rotation:6.4284,x:-103.4,y:9.65},0).wait(1).to({rotation:5.357,x:-103.8,y:10},0).wait(1).to({rotation:4.2856,x:-104.25,y:10.3},0).wait(1).to({rotation:3.2142,x:-104.65,y:10.65},0).wait(1).to({rotation:2.1428,x:-105.15,y:11.05},0).wait(1).to({rotation:1.0714,x:-105.5,y:11.4},0).wait(1).to({rotation:0,x:-105.9,y:11.75},0).wait(1).to({rotation:0.9677,x:-105.55,y:11.45},0).wait(1).to({rotation:1.9354,x:-105.15,y:11.1},0).wait(1).to({rotation:2.9031,x:-104.8,y:10.75},0).wait(1).to({rotation:3.8709,x:-104.45,y:10.5},0).wait(1).to({rotation:4.8386,x:-104.05,y:10.15},0).wait(1).to({rotation:5.8063,x:-103.65,y:9.85},0).wait(1).to({rotation:6.774,x:-103.2,y:9.6},0).wait(1).to({rotation:7.7417,x:-102.8,y:9.3},0).wait(1).to({rotation:8.7094,x:-102.4,y:9.05},0).wait(1).to({rotation:9.6772,x:-101.95,y:8.75},0).wait(1).to({rotation:10.6449,x:-101.45,y:8.5},0).wait(1).to({rotation:11.6126,x:-101.05,y:8.25},0).wait(1).to({rotation:12.5803,x:-100.6,y:8.05},0).wait(1).to({rotation:13.548,x:-100.1,y:7.75},0).wait(1).to({rotation:14.5157,x:-99.6,y:7.5},0).wait(1).to({rotation:15.4835,x:-99.1,y:7.35},0).wait(1).to({rotation:16.4512,x:-98.7,y:7.1},0).wait(1).to({rotation:17.4189,x:-98.15,y:6.85},0).wait(1).to({rotation:18.3866,x:-97.65,y:6.65},0).wait(1).to({rotation:19.3543,x:-97.2,y:6.45},0).wait(1).to({rotation:20.322,x:-96.65,y:6.3},0).wait(1).to({rotation:21.2898,x:-96.1,y:6.15},0).wait(1).to({rotation:22.2575,x:-95.6,y:6},0).wait(1).to({rotation:23.2252,x:-95.05,y:5.9},0).wait(1).to({rotation:24.1929,x:-94.5,y:5.7},0).wait(1).to({rotation:25.1606,x:-93.95,y:5.6},0).wait(1).to({rotation:26.1283,x:-93.45,y:5.45},0).wait(1).to({rotation:27.0961,x:-92.9,y:5.35},0).wait(1).to({rotation:28.0638,x:-92.25,y:5.2},0).wait(1).to({rotation:29.0315,x:-91.7,y:5.15},0).wait(1).to({rotation:29.9992,x:-91.2,y:5},0).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFC3C3").s().p("AFUK6QhcgVhRgxQhSgxg+hHQgggmgig1QgTgegnhDIhzjFQhjirgzhWQhViOhIhvQglg6gOglQgUg4AQgsQAKgdAiglQAwgxApgHQAzgKA8AnQAkAXAlAmQAVAWAqAzIKGMUQA2BCAZAmQAnA8ANA4QAQBCgVA/QgXBDg4AcQgiAQguAAQgiAAgpgJg");
	this.shape.setTransform(-32.872,91.0306);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(60));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-143.4,-32.2,169.20000000000002,194);


(lib.girlheadtalking = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.instance = new lib.girlmouthtalk();
	this.instance.setTransform(90.75,188.8,1,1,0,0,0,26.8,17.8);

	this.instance_1 = new lib.girleyes();
	this.instance_1.setTransform(95.15,120.7,1,1,0,0,0,71.8,15.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3A16A").s().p("AOYMoIgYgyQgPgcgPgTQgVgdg2gwQiRiBgqgnQhnhghJhSQi7jWhEjVQgSg7gThaQgJgugCgaQgEgoAHgfQAFgYAMgQQAOgTATgEQAMgDAMAEIAAgoQgiAZg2AiQipBuiOBXQhbA3gqAgQioB/hqDcQg/CFgLASQgwBSg/AjQgaAOgZACQgeACgTgQIgGgHIgMAjQgjBmgUAoQgnBLg5AgQgcAQgTgIQgMgGgMgTQheijBokbQByk6DYkKQDWkJEdiyQBPgyA9gWQBSgeBGAIQAnAFAuASQAdALA0AZQAKAFAFAFQAbgPAYgGQAOgEAOAAIAOgPQAXgWAcgKQAegMAbAHQATAFARAOQAPANAJATQARAkgIArIgGAaIANgCQAjgEApAQQAbALArAbIDMB+QA2AkAbAYQApAmARApIAJAcQAGATAEAJQAKAUAiArQBaBwA0CHQAPAlAEAbQAGAlgKAdQgDAIgLAYQgJATgDANQgCAMABAXQACAYgCAKQgCAQgMAbQgMAdgDAOQgEAUAEAbIAKAwQASBRgFBUQgEBLgdAlQgdAlg0AGQgZADgWgGQgFBVgNBbgAJUjXQgCgIgEgEIgDgDIAJAPg");
	this.shape.setTransform(97.7881,75.5326);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFC3C3").s().p("AkASQQhcgOhIgjQhug2hnh9QgaggiNjJIhriaQg6hagahMQgahNgGhgQgFhHAFhrQAIixAZiCQAgilBAh/QBJiQCPiUQDvj3Dyg4QCmgnDdApQDHAkCCBPQBDApBIBEQAsApBQBWQBTBZAmAyQA+BRAcBNQAmBlgFCHQgDBVgbCdQgaCagSBNQgfB/gsBfQgnBRhBBbQgrA8hSBkQh4CThSBLQh6Bvh+AuQhvApirACIgXABQhTAAhCgKg");
	this.shape_1.setTransform(102.6544,117.7518);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C3A16A").s().p("AojZcQg0gOgfgyQgfgyAKg1QgcgCgZgUQgYAmglANQgcAKgggJQgfgJgVgXQgfgkgEg8QgBgTACgXQgYAKgZgBQgfgBgcgPQgdgQgRgZQgZglgDg4IABgfQgjACgcgTQg1gmAChtQABg1AIhBIAGgtQgLAEgMgBQgbgDgWgWQgTgUgKgeQgTg8AQhRQALg2AZhAQALgdAVgwQgJgKgHgOQgGgNgHgbQgmidgJhuQgLiTAkh4IAFgPIgQAUQgMAPgLgDQgJgDgEgRQgch1AfiMQAZhrBCiJQA5h2B7jSIAAgHQACgeAKgbQAJgXAdgwQAbgtAVgfQBriZChhYQBCglAxgBQAfgBAcANIAJAFQAfgOAjgLQAZgPAbgOQBug6BigSQAsgIA3gDQAigCBCAAQBPgBAqAFQBCAHAwAXQA2AaA/BAIBDBFIAPACQAUADAUAJQATAIAYAOQA2AhBKAzQCYBnBLA8QB6BgBQBgQBIBWAwBiQAyBmAWBqQAWBugKBuQgGBHgTBCIAQA6QBMEjgvDYQgEATgJAMQgMAPgOgCQgNgDgNgWIgFgJQAgCLAXC2QAWC4ACB4QACBhgOBEQgRBZguA7QgXAegXgBQgSgBgUgWQgsg0gThUQgLgygGhbQgCASgEAPQAEBZgFBQQgDA1gHAkQgKAwgVAjQgPAbgWAOQgaAQgYgKQgVgIgQghIgMgbIgIAFQgXAOgXAAQgWABgVgLIAAA+QAAAsgDAXQgGAkgQAYQgVAegkAMQglANgigMQgKgDgJgFIgKAFQgmARghgNQgWgJgQgUQgPgSgHgZQgIgagCgxQgGARgHAMQgQAcgcAQQgcARgggBQgfgBgcgRQgcgSgNgcIg3gDQgEAkgZAcQgYAdgiAIQgjAJgjgPQgigOgRggQgKgUgDgdQgCgQAAgkQADjugGj9QgBgoACgWQADgiAKgZIAKgUQAFgNACgJQACgIgBgMIgBgVQgCgoASgkQAKgVAQgMQASgPATACQAVADAPAWQALAOAKAcIA4CeQAQgDANgTIASgjQAJgSAQgUIAfghQAkglAVgMQAKgFAJgDQgBgOgHgHIgMgJQgHgFgDgFQgEgKAJgKQAIgIAMgFQAfgNAWAEQATADASASQgEgvgJgmQgFgYADgKQAGgQAZgLQAggOAXAHQAcAHAZAqQANg9ABhBIAChDQADgmANgZQATgjAngRQAngRAmAKQgEgaAegdQArgsAFgHQAIgOAFgUQACgLADgZQAEgqAGgaQAIglAPgbIAEgGQgmjmhCjhQgIgcAAgQQgBgZAMgPIAHgIIgVhHIg1hqIgnhJQgWgRgKgKIgLgNIgGgCQgWgJgIgEQgSgKgUgVQgWgZgMgLQgUgTgXgPIgaABIhTAAQANAWgDAcQgEAcgTASQgTASgcACQgcACgWgPQgTgNgagtQgYgpgWgMQgOgHgXgDIgmgEQgngHgfgbQgggbgNglQgKgbACgeIg6gCIhngGQhegChAAXQh6BQhIB8IgmBFQgXApgVAZQgcAggjAQQgPAHgPADQhEBngmBgQgYA/gSBOIACABQANAGAAATQAAAGgFAbQgDATADAZIAJAsQARBTgBBoQgBBEgKB2IgSDFQAIAHAGANQATAiAKA+QAJA2ADA1QANgFAPACQAeAEAXAmQAGAJAJAWQAKAUAGALQAHALASAVQARAVAHAMQASAcACAiQACAbgHAZQAHAHAGAIQAKAOAHgBQAEAAAJgIQAbgZAogCQApgCAdAXQAjAcANA3QAFAUADAcIAEAxQACAVAHAJQAGAHAKAFIATAIQAhARARAqQALAaAGAzQAFAwACAwQADBCgJAoQgPA6gpAeIgTAMQgKAHgFAIQgHALgBAXIgDAvQgDAagHAUQgTAyg0AbQgiARgiAAQgSAAgTgFg");
	this.shape_2.setTransform(105.8175,135.9289);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.girlheadtalking, new cjs.Rectangle(-28.1,-27.4,267.90000000000003,326.7), null);


(lib.girlheadquiet = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.instance = new lib.girlmouthclosed();
	this.instance.setTransform(90.75,188.8,1,1,0,0,0,26.8,17.8);

	this.instance_1 = new lib.girleyes();
	this.instance_1.setTransform(95.15,120.7,1,1,0,0,0,71.8,15.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3A16A").s().p("AOYMoIgYgyQgPgcgPgTQgVgdg2gwQiRiBgqgnQhnhghJhSQi7jWhEjVQgSg7gThaQgJgugCgaQgEgoAHgfQAFgYAMgQQAOgTATgEQAMgDAMAEIAAgoQgiAZg2AiQipBuiOBXQhbA3gqAgQioB/hqDcQg/CFgLASQgwBSg/AjQgaAOgZACQgeACgTgQIgGgHIgMAjQgjBmgUAoQgnBLg5AgQgcAQgTgIQgMgGgMgTQheijBokbQByk6DYkKQDWkJEdiyQBPgyA9gWQBSgeBGAIQAnAFAuASQAdALA0AZQAKAFAFAFQAbgPAYgGQAOgEAOAAIAOgPQAXgWAcgKQAegMAbAHQATAFARAOQAPANAJATQARAkgIArIgGAaIANgCQAjgEApAQQAbALArAbIDMB+QA2AkAbAYQApAmARApIAJAcQAGATAEAJQAKAUAiArQBaBwA0CHQAPAlAEAbQAGAlgKAdQgDAIgLAYQgJATgDANQgCAMABAXQACAYgCAKQgCAQgMAbQgMAdgDAOQgEAUAEAbIAKAwQASBRgFBUQgEBLgdAlQgdAlg0AGQgZADgWgGQgFBVgNBbgAJUjXQgCgIgEgEIgDgDIAJAPg");
	this.shape.setTransform(97.7881,75.5326);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFC3C3").s().p("AkASQQhcgOhIgjQhug2hnh9QgaggiNjJIhriaQg6hagahMQgahNgGhgQgFhHAFhrQAIixAZiCQAgilBAh/QBJiQCPiUQDvj3Dyg4QCmgnDdApQDHAkCCBPQBDApBIBEQAsApBQBWQBTBZAmAyQA+BRAcBNQAmBlgFCHQgDBVgbCdQgaCagSBNQgfB/gsBfQgnBRhBBbQgrA8hSBkQh4CThSBLQh6Bvh+AuQhvApirACIgXABQhTAAhCgKg");
	this.shape_1.setTransform(102.6544,117.7518);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C3A16A").s().p("AojZcQg0gOgfgyQgfgyAKg1QgcgCgZgUQgYAmglANQgcAKgggJQgfgJgVgXQgfgkgEg8QgBgTACgXQgYAKgZgBQgfgBgcgPQgdgQgRgZQgZglgDg4IABgfQgjACgcgTQg1gmAChtQABg1AIhBIAGgtQgLAEgMgBQgbgDgWgWQgTgUgKgeQgTg8AQhRQALg2AZhAQALgdAVgwQgJgKgHgOQgGgNgHgbQgmidgJhuQgLiTAkh4IAFgPIgQAUQgMAPgLgDQgJgDgEgRQgch1AfiMQAZhrBCiJQA5h2B7jSIAAgHQACgeAKgbQAJgXAdgwQAbgtAVgfQBriZChhYQBCglAxgBQAfgBAcANIAJAFQAfgOAjgLQAZgPAbgOQBug6BigSQAsgIA3gDQAigCBCAAQBPgBAqAFQBCAHAwAXQA2AaA/BAIBDBFIAPACQAUADAUAJQATAIAYAOQA2AhBKAzQCYBnBLA8QB6BgBQBgQBIBWAwBiQAyBmAWBqQAWBugKBuQgGBHgTBCIAQA6QBMEjgvDYQgEATgJAMQgMAPgOgCQgNgDgNgWIgFgJQAgCLAXC2QAWC4ACB4QACBhgOBEQgRBZguA7QgXAegXgBQgSgBgUgWQgsg0gThUQgLgygGhbQgCASgEAPQAEBZgFBQQgDA1gHAkQgKAwgVAjQgPAbgWAOQgaAQgYgKQgVgIgQghIgMgbIgIAFQgXAOgXAAQgWABgVgLIAAA+QAAAsgDAXQgGAkgQAYQgVAegkAMQglANgigMQgKgDgJgFIgKAFQgmARghgNQgWgJgQgUQgPgSgHgZQgIgagCgxQgGARgHAMQgQAcgcAQQgcARgggBQgfgBgcgRQgcgSgNgcIg3gDQgEAkgZAcQgYAdgiAIQgjAJgjgPQgigOgRggQgKgUgDgdQgCgQAAgkQADjugGj9QgBgoACgWQADgiAKgZIAKgUQAFgNACgJQACgIgBgMIgBgVQgCgoASgkQAKgVAQgMQASgPATACQAVADAPAWQALAOAKAcIA4CeQAQgDANgTIASgjQAJgSAQgUIAfghQAkglAVgMQAKgFAJgDQgBgOgHgHIgMgJQgHgFgDgFQgEgKAJgKQAIgIAMgFQAfgNAWAEQATADASASQgEgvgJgmQgFgYADgKQAGgQAZgLQAggOAXAHQAcAHAZAqQANg9ABhBIAChDQADgmANgZQATgjAngRQAngRAmAKQgEgaAegdQArgsAFgHQAIgOAFgUQACgLADgZQAEgqAGgaQAIglAPgbIAEgGQgmjmhCjhQgIgcAAgQQgBgZAMgPIAHgIIgVhHIg1hqIgnhJQgWgRgKgKIgLgNIgGgCQgWgJgIgEQgSgKgUgVQgWgZgMgLQgUgTgXgPIgaABIhTAAQANAWgDAcQgEAcgTASQgTASgcACQgcACgWgPQgTgNgagtQgYgpgWgMQgOgHgXgDIgmgEQgngHgfgbQgggbgNglQgKgbACgeIg6gCIhngGQhegChAAXQh6BQhIB8IgmBFQgXApgVAZQgcAggjAQQgPAHgPADQhEBngmBgQgYA/gSBOIACABQANAGAAATQAAAGgFAbQgDATADAZIAJAsQARBTgBBoQgBBEgKB2IgSDFQAIAHAGANQATAiAKA+QAJA2ADA1QANgFAPACQAeAEAXAmQAGAJAJAWQAKAUAGALQAHALASAVQARAVAHAMQASAcACAiQACAbgHAZQAHAHAGAIQAKAOAHgBQAEAAAJgIQAbgZAogCQApgCAdAXQAjAcANA3QAFAUADAcIAEAxQACAVAHAJQAGAHAKAFIATAIQAhARARAqQALAaAGAzQAFAwACAwQADBCgJAoQgPA6gpAeIgTAMQgKAHgFAIQgHALgBAXIgDAvQgDAagHAUQgTAyg0AbQgiARgiAAQgSAAgTgFg");
	this.shape_2.setTransform(105.8175,135.9289);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.girlheadquiet, new cjs.Rectangle(-28.1,-27.4,267.90000000000003,326.7), null);


(lib.girlarmstopped = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.girlrightarmstopped("synched",0);
	this.instance.setTransform(148.65,179.65,1,1,-3.7051,0,0,12.7,140.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:-58.7,regY:60,rotation:-5.4554,x:69.95,y:106.7,startPosition:1},0).wait(1).to({rotation:-7.2056,x:67.8,y:109.1,startPosition:2},0).wait(1).to({rotation:-8.9558,x:65.65,y:111.6,startPosition:3},0).wait(1).to({rotation:-10.706,x:63.6,y:114.15,startPosition:4},0).wait(1).to({rotation:-12.4562,x:61.7,y:116.8,startPosition:5},0).wait(1).to({rotation:-14.2064,x:59.75,y:119.45,startPosition:6},0).wait(1).to({rotation:-15.9566,x:58,y:122.25,startPosition:7},0).wait(1).to({rotation:-17.7068,x:56.3,y:125,startPosition:8},0).wait(1).to({rotation:-19.457,x:54.65,y:127.85,startPosition:9},0).wait(1).to({rotation:-21.2071,x:53.15,y:130.8,startPosition:10},0).wait(1).to({rotation:-22.9573,x:51.7,y:133.7,startPosition:11},0).wait(1).to({rotation:-24.7075,x:50.3,y:136.7,startPosition:12},0).wait(1).to({rotation:-26.4577,x:49.1,y:139.7,startPosition:13},0).wait(1).to({rotation:-28.2079,x:47.85,y:142.75,startPosition:14},0).wait(1).to({rotation:-29.9581,x:46.8,y:145.85,startPosition:15},0).wait(1).to({rotation:-31.7083,x:45.85,y:149,startPosition:16},0).wait(1).to({rotation:-33.4585,x:45,y:152.1,startPosition:17},0).wait(1).to({rotation:-35.2087,x:44.2,y:155.3,startPosition:18},0).wait(1).to({rotation:-36.9589,x:43.45,y:158.55,startPosition:19},0).wait(1).to({rotation:-38.7091,x:42.85,y:161.7,startPosition:20},0).wait(1).to({rotation:-40.4593,x:42.4,y:165,startPosition:21},0).wait(1).to({rotation:-42.2095,x:41.95,y:168.25,startPosition:22},0).wait(1).to({rotation:-43.9597,x:41.7,y:171.5,startPosition:23},0).wait(1).to({rotation:-45.7099,x:41.5,y:174.75,startPosition:24},0).wait(1).to({rotation:-47.4601,x:41.35,y:178.05,startPosition:25},0).wait(1).to({rotation:-49.2103,x:41.4,y:181.35,startPosition:26},0).wait(1).to({rotation:-50.9605,x:41.5,y:184.6,startPosition:27},0).wait(1).to({rotation:-52.7107,x:41.75,y:187.85,startPosition:28},0).wait(1).to({rotation:-54.4609,x:42,y:191.15,startPosition:29},0).wait(1).to({rotation:-56.211,x:42.4,y:194.4,startPosition:30},0).wait(1).to({rotation:-57.9612,x:42.9,y:197.65,startPosition:31},0).wait(1).to({rotation:-59.7114,x:43.5,y:200.85,startPosition:32},0).wait(1).to({rotation:-61.4616,x:44.2,y:204,startPosition:33},0).wait(1).to({rotation:-63.2118,x:45,y:207.25,startPosition:34},0).wait(1).to({rotation:-64.962,x:45.9,y:210.4,startPosition:35},0).wait(1).to({rotation:-66.7122,x:46.9,y:213.45,startPosition:36},0).wait(1).to({rotation:-68.4624,x:47.95,y:216.6,startPosition:37},0).wait(1).to({rotation:-70.2126,x:49.15,y:219.65,startPosition:38},0).wait(1).to({rotation:-71.9628,x:50.4,y:222.65,startPosition:39},0).wait(1).to({startPosition:40},0).wait(1).to({startPosition:41},0).wait(1).to({startPosition:42},0).wait(1).to({startPosition:43},0).wait(1).to({startPosition:44},0).wait(1).to({startPosition:45},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:47},0).wait(1).to({startPosition:48},0).wait(1).to({startPosition:49},0).wait(1).to({startPosition:50},0).wait(1).to({startPosition:51},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:53},0).wait(1).to({startPosition:54},0).wait(1).to({startPosition:55},0).wait(1).to({startPosition:56},0).wait(1).to({startPosition:57},0).wait(1).to({startPosition:58},0).wait(1).to({startPosition:59},0).wait(1).to({startPosition:60},0).wait(1).to({startPosition:61},0).wait(1).to({startPosition:62},0).wait(1).to({startPosition:63},0).wait(1).to({startPosition:64},0).wait(1).to({startPosition:65},0).wait(1).to({startPosition:66},0).wait(1).to({startPosition:67},0).wait(1).to({startPosition:68},0).wait(1).to({startPosition:69},0).wait(1).to({startPosition:70},0).wait(1).to({startPosition:71},0).wait(1).to({startPosition:72},0).wait(1).to({startPosition:73},0).wait(1).to({startPosition:74},0).wait(1).to({startPosition:75},0).wait(1).to({startPosition:76},0).wait(1).to({startPosition:77},0).wait(1).to({startPosition:78},0).wait(1).to({startPosition:79},0).wait(1).to({startPosition:80},0).wait(1).to({startPosition:81},0).wait(1).to({startPosition:82},0).wait(1).to({startPosition:83},0).wait(1).to({startPosition:84},0).wait(1).to({startPosition:85},0).wait(1).to({startPosition:86},0).wait(1).to({startPosition:87},0).wait(1).to({startPosition:88},0).wait(1).to({startPosition:89},0).wait(1).to({startPosition:90},0).wait(1).to({startPosition:91},0).wait(1).to({startPosition:92},0).wait(1).to({startPosition:93},0).wait(1).to({startPosition:94},0).wait(1).to({startPosition:95},0).wait(1).to({startPosition:96},0).wait(1).to({startPosition:97},0).wait(1).to({startPosition:98},0).wait(1).to({startPosition:99},0).wait(1).to({startPosition:100},0).wait(1).to({startPosition:101},0).wait(1).to({startPosition:102},0).wait(1).to({startPosition:103},0).wait(1).to({startPosition:104},0).wait(1).to({startPosition:105},0).wait(1).to({startPosition:106},0).wait(1).to({startPosition:107},0).wait(1).to({startPosition:108},0).wait(1).to({startPosition:109},0).wait(1).to({startPosition:110},0).wait(1).to({startPosition:111},0).wait(1).to({startPosition:112},0).wait(1).to({startPosition:113},0).wait(1).to({startPosition:114},0).wait(1).to({startPosition:115},0).wait(1).to({startPosition:116},0).wait(1).to({startPosition:117},0).wait(1).to({startPosition:118},0).wait(1).to({startPosition:119},0).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFC3C3").s().p("ApWLmQg9gFgxgmQgzgpgKg5QgHgnANgvQAJggAYgxQA4h0BRiLQAvhQBoimQAwhMAcgoQAsg+AsgrQAXgWAtglQAxgoAUgSQATgRB8iIQBXhfBIgoQBIgnBTgIQBTgJBOAYQBOAXBCA0QBBAzAqBHQAfA0AJAzQALA6gTAwQgVA1g3AYQg6AYgsgdQgdgUgnhLQgjhFgngPQAKAygdA/QgRAkgqBGQgXAsghBZQgjBbgVApQg9B1iQB+QggAdhcBLQhQBBgrApIhVBRQgyAwgnAcQhmBLhiAAIgWgBg");
	this.shape.setTransform(208.2683,120.9606);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(120));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-65.2,11.4,350.7,271.20000000000005);


(lib.girlarmmoving = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.girlrightarmmove("synched",0);
	this.instance.setTransform(148.65,179.65,1,1,0,0,0,10.8,143.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:-59.1,regY:61.8,rotation:-0.6238,x:77.8,y:98.5,startPosition:1},0).wait(1).to({rotation:-1.2476,x:76.95,y:99.3,startPosition:2},0).wait(1).to({rotation:-1.8714,x:76.1,y:100.05,startPosition:3},0).wait(1).to({rotation:-2.4952,x:75.25,y:100.85,startPosition:4},0).wait(1).to({rotation:-3.119,x:74.35,y:101.65,startPosition:5},0).wait(1).to({rotation:-3.7429,x:73.55,y:102.45,startPosition:6},0).wait(1).to({rotation:-4.3667,x:72.65,y:103.25,startPosition:7},0).wait(1).to({rotation:-4.9905,x:71.85,y:104.1,startPosition:8},0).wait(1).to({rotation:-5.6143,x:71.05,y:104.95,startPosition:9},0).wait(1).to({rotation:-6.2381,x:70.25,y:105.8,startPosition:10},0).wait(1).to({rotation:-6.8619,x:69.45,y:106.65,startPosition:11},0).wait(1).to({rotation:-7.4857,x:68.65,y:107.5,startPosition:12},0).wait(1).to({rotation:-8.1095,x:67.85,y:108.45,startPosition:13},0).wait(1).to({rotation:-8.7333,x:67.15,y:109.3,startPosition:14},0).wait(1).to({rotation:-9.3572,x:66.35,y:110.2,startPosition:15},0).wait(1).to({rotation:-9.981,x:65.6,y:111.05,startPosition:16},0).wait(1).to({rotation:-10.6048,x:64.8,y:112,startPosition:17},0).wait(1).to({rotation:-11.2286,x:64.15,y:112.9,startPosition:18},0).wait(1).to({rotation:-11.8524,x:63.4,y:113.85,startPosition:19},0).wait(1).to({rotation:-12.4762,x:62.7,y:114.75,startPosition:20},0).wait(1).to({rotation:-13.1,x:62,y:115.7,startPosition:21},0).wait(1).to({rotation:-13.7238,x:61.3,y:116.65,startPosition:22},0).wait(1).to({rotation:-14.3476,x:60.6,y:117.6,startPosition:23},0).wait(1).to({rotation:-14.9714,x:59.95,y:118.55,startPosition:24},0).wait(1).to({rotation:-15.5952,x:59.3,y:119.5,startPosition:25},0).wait(1).to({rotation:-16.2191,x:58.65,y:120.5,startPosition:26},0).wait(1).to({rotation:-16.8429,x:58,y:121.45,startPosition:27},0).wait(1).to({rotation:-17.4667,x:57.4,y:122.5,startPosition:28},0).wait(1).to({rotation:-18.0905,x:56.75,y:123.5,startPosition:29},0).wait(1).to({rotation:-18.7143,x:56.15,y:124.5,startPosition:30},0).wait(1).to({rotation:-18.0492,x:56.8,y:123.4,startPosition:31},0).wait(1).to({rotation:-17.3841,x:57.45,y:122.35,startPosition:32},0).wait(1).to({rotation:-16.7189,x:58.15,y:121.3,startPosition:33},0).wait(1).to({rotation:-16.0538,x:58.8,y:120.25,startPosition:34},0).wait(1).to({rotation:-15.3887,x:59.5,y:119.25,startPosition:35},0).wait(1).to({rotation:-14.7236,x:60.2,y:118.15,startPosition:36},0).wait(1).to({rotation:-14.0585,x:60.9,y:117.15,startPosition:37},0).wait(1).to({rotation:-13.3934,x:61.65,y:116.15,startPosition:38},0).wait(1).to({rotation:-12.7282,x:62.4,y:115.15,startPosition:39},0).wait(1).to({rotation:-12.0631,x:63.15,y:114.15,startPosition:40},0).wait(1).to({rotation:-11.398,x:63.9,y:113.2,startPosition:41},0).wait(1).to({rotation:-10.7329,x:64.7,y:112.15,startPosition:42},0).wait(1).to({rotation:-10.0678,x:65.5,y:111.2,startPosition:43},0).wait(1).to({rotation:-9.4027,x:66.3,y:110.2,startPosition:44},0).wait(1).to({rotation:-8.7375,x:67.15,y:109.35,startPosition:45},0).wait(1).to({rotation:-8.0724,x:67.95,y:108.35,startPosition:46},0).wait(1).to({rotation:-7.4073,x:68.75,y:107.4,startPosition:47},0).wait(1).to({rotation:-6.7422,x:69.6,y:106.5,startPosition:48},0).wait(1).to({rotation:-6.0771,x:70.5,y:105.6,startPosition:49},0).wait(1).to({rotation:-5.412,x:71.3,y:104.65,startPosition:50},0).wait(1).to({rotation:-4.7468,x:72.15,y:103.8,startPosition:51},0).wait(1).to({rotation:-4.0817,x:73.1,y:102.9,startPosition:52},0).wait(1).to({rotation:-3.4166,x:74,y:102,startPosition:53},0).wait(1).to({rotation:-2.7515,x:74.85,y:101.2,startPosition:54},0).wait(1).to({rotation:-2.0864,x:75.8,y:100.3,startPosition:55},0).wait(1).to({rotation:-1.4212,x:76.7,y:99.5,startPosition:56},0).wait(1).to({rotation:-0.7561,x:77.65,y:98.7,startPosition:57},0).wait(1).to({rotation:-0.091,x:78.6,y:97.85,startPosition:58},0).wait(1).to({rotation:0.5741,x:79.55,y:97,startPosition:59},0).wait(1).to({rotation:1.2392,x:80.5,y:96.25,startPosition:0},0).wait(1).to({rotation:1.9043,x:81.5,y:95.45,startPosition:1},0).wait(1).to({rotation:2.5695,x:82.5,y:94.7,startPosition:2},0).wait(1).to({rotation:3.2346,x:83.45,y:93.9,startPosition:3},0).wait(1).to({rotation:3.8997,x:84.45,y:93.15,startPosition:4},0).wait(1).to({rotation:4.5648,x:85.5,y:92.4,startPosition:5},0).wait(1).to({rotation:5.2299,x:86.45,y:91.7,startPosition:6},0).wait(1).to({rotation:5.895,x:87.5,y:91,startPosition:7},0).wait(1).to({rotation:6.5602,x:88.55,y:90.3,startPosition:8},0).wait(1).to({rotation:7.2253,x:89.6,y:89.55,startPosition:9},0).wait(1).to({rotation:7.8904,x:90.6,y:88.9,startPosition:10},0).wait(1).to({rotation:8.5555,x:91.65,y:88.2,startPosition:11},0).wait(1).to({rotation:9.2206,x:92.75,y:87.6,startPosition:12},0).wait(1).to({rotation:9.8857,x:93.85,y:86.95,startPosition:13},0).wait(1).to({rotation:10.5509,x:94.9,y:86.35,startPosition:14},0).wait(1).to({rotation:11.216,x:96,y:85.65,startPosition:15},0).wait(1).to({rotation:11.8811,x:97.1,y:85.15,startPosition:16},0).wait(1).to({rotation:11.6048,x:96.6,y:85.35,startPosition:17},0).wait(1).to({rotation:11.3285,x:96.15,y:85.6,startPosition:18},0).wait(1).to({rotation:11.0522,x:95.7,y:85.8,startPosition:19},0).wait(1).to({rotation:10.7759,x:95.25,y:86.1,startPosition:20},0).wait(1).to({rotation:10.4996,x:94.85,y:86.35,startPosition:21},0).wait(1).to({rotation:10.2233,x:94.4,y:86.6,startPosition:22},0).wait(1).to({rotation:9.947,x:93.95,y:86.85,startPosition:23},0).wait(1).to({rotation:9.6707,x:93.45,y:87.1,startPosition:24},0).wait(1).to({rotation:9.3944,x:93,y:87.4,startPosition:25},0).wait(1).to({rotation:9.1181,x:92.6,y:87.7,startPosition:26},0).wait(1).to({rotation:8.8417,x:92.15,y:87.9,startPosition:27},0).wait(1).to({rotation:8.5654,x:91.7,y:88.2,startPosition:28},0).wait(1).to({rotation:8.2891,x:91.25,y:88.5,startPosition:29},0).wait(1).to({rotation:8.0128,x:90.85,y:88.75,startPosition:30},0).wait(1).to({rotation:7.7365,x:90.4,y:89.1,startPosition:31},0).wait(1).to({rotation:7.4602,x:89.95,y:89.4,startPosition:32},0).wait(1).to({rotation:7.1839,x:89.45,y:89.6,startPosition:33},0).wait(1).to({rotation:6.9076,x:89.1,y:89.9,startPosition:34},0).wait(1).to({rotation:6.6313,x:88.65,y:90.25,startPosition:35},0).wait(1).to({rotation:6.355,x:88.2,y:90.45,startPosition:36},0).wait(1).to({rotation:6.0787,x:87.8,y:90.8,startPosition:37},0).wait(1).to({rotation:5.8024,x:87.35,y:91.1,startPosition:38},0).wait(1).to({rotation:5.5261,x:86.95,y:91.35,startPosition:39},0).wait(1).to({rotation:5.2498,x:86.5,y:91.7,startPosition:40},0).wait(1).to({rotation:4.9735,x:86.05,y:92,startPosition:41},0).wait(1).to({rotation:4.6972,x:85.65,y:92.25,startPosition:42},0).wait(1).to({rotation:4.4209,x:85.3,y:92.55,startPosition:43},0).wait(1).to({rotation:4.1446,x:84.85,y:92.9,startPosition:44},0).wait(1).to({rotation:3.8683,x:84.45,y:93.15,startPosition:45},0).wait(1).to({rotation:3.592,x:84,y:93.55,startPosition:46},0).wait(1).to({rotation:3.3157,x:83.6,y:93.85,startPosition:47},0).wait(1).to({rotation:3.0394,x:83.15,y:94.1,startPosition:48},0).wait(1).to({rotation:2.763,x:82.7,y:94.45,startPosition:49},0).wait(1).to({rotation:2.4867,x:82.3,y:94.8,startPosition:50},0).wait(1).to({rotation:2.2104,x:81.9,y:95.05,startPosition:51},0).wait(1).to({rotation:1.9341,x:81.55,y:95.4,startPosition:52},0).wait(1).to({rotation:1.6578,x:81.15,y:95.7,startPosition:53},0).wait(1).to({rotation:1.3815,x:80.7,y:96.1,startPosition:54},0).wait(1).to({rotation:1.1052,x:80.3,y:96.4,startPosition:55},0).wait(1).to({rotation:0.8289,x:79.9,y:96.75,startPosition:56},0).wait(1).to({rotation:0.5526,x:79.5,y:97.1,startPosition:57},0).wait(1).to({rotation:0.2763,x:79.1,y:97.35,startPosition:58},0).wait(1).to({rotation:0,x:78.75,y:97.75,startPosition:59},0).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFC3C3").s().p("ApWLmQg9gFgxgmQgzgpgKg5QgHgnANgvQAJggAYgxQA4h0BRiLQAvhQBoimQAwhMAcgoQAsg+AsgrQAXgWAtglQAxgoAUgSQATgRB8iIQBXhfBIgoQBIgnBTgIQBTgJBOAYQBOAXBCA0QBBAzAqBHQAfA0AJAzQALA6gTAwQgVA1g3AYQg6AYgsgdQgdgUgnhLQgjhFgngPQAKAygdA/QgRAkgqBGQgXAsghBZQgjBbgVApQg9B1iQB+QggAdhcBLQhQBBgrApIhVBRQgyAwgnAcQhmBLhiAAIgWgBg");
	this.shape.setTransform(208.2683,120.9606);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(120));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41,-12.1,326.5,211.4);


(lib.Scene_1_speach_bubble3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// speach_bubble3
	this.instance = new lib.bubble3("synched",0);
	this.instance.setTransform(795.6,395.4,0.1614,0.1614,0,0,0,249.8,166.7);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(499).to({_off:false},0).wait(1).to({regX:242.6,regY:240.1,scaleX:0.3701,scaleY:0.3701,x:753.1,y:371.2,startPosition:1},0).wait(1).to({scaleX:0.5771,scaleY:0.5771,x:712.05,y:335.5,startPosition:2},0).wait(1).to({scaleX:0.7823,scaleY:0.7823,x:671.45,y:300.1,startPosition:3},0).wait(1).to({scaleX:0.9857,scaleY:0.9857,x:631.15,y:265,startPosition:4},0).wait(1).to({scaleX:1,scaleY:1,x:628.35,y:262.6,startPosition:5},0).wait(1).to({startPosition:6},0).wait(1).to({startPosition:7},0).wait(1).to({startPosition:8},0).wait(1).to({startPosition:9},0).wait(1).to({startPosition:10},0).wait(1).to({startPosition:11},0).wait(1).to({startPosition:12},0).wait(1).to({startPosition:13},0).wait(1).to({startPosition:14},0).wait(1).to({startPosition:15},0).wait(1).to({startPosition:16},0).wait(1).to({startPosition:17},0).wait(1).to({startPosition:18},0).wait(1).to({startPosition:19},0).wait(1).to({startPosition:20},0).wait(1).to({startPosition:21},0).wait(1).to({startPosition:22},0).wait(1).to({startPosition:23},0).wait(1).to({startPosition:24},0).wait(1).to({startPosition:25},0).wait(1).to({startPosition:26},0).wait(1).to({startPosition:27},0).wait(1).to({startPosition:28},0).wait(1).to({startPosition:29},0).wait(1).to({startPosition:30},0).wait(1).to({startPosition:31},0).wait(1).to({startPosition:32},0).wait(1).to({startPosition:33},0).wait(1).to({startPosition:34},0).wait(1).to({startPosition:35},0).wait(1).to({startPosition:36},0).wait(1).to({startPosition:37},0).wait(1).to({startPosition:38},0).wait(1).to({startPosition:39},0).wait(1).to({startPosition:40},0).wait(1).to({startPosition:41},0).wait(1).to({startPosition:42},0).wait(1).to({startPosition:43},0).wait(1).to({startPosition:44},0).wait(1).to({startPosition:45},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:47},0).wait(1).to({startPosition:48},0).wait(1).to({startPosition:49},0).wait(1).to({startPosition:50},0).wait(1).to({startPosition:51},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:53},0).wait(1).to({startPosition:54},0).wait(1).to({startPosition:55},0).wait(1).to({startPosition:56},0).wait(1).to({startPosition:57},0).wait(1).to({startPosition:58},0).wait(1).to({startPosition:59},0).wait(1).to({startPosition:60},0).wait(1).to({startPosition:61},0).wait(1).to({startPosition:62},0).wait(1).to({startPosition:63},0).wait(1).to({startPosition:64},0).wait(1).to({startPosition:65},0).wait(1).to({startPosition:66},0).wait(1).to({startPosition:67},0).wait(1).to({startPosition:68},0).wait(1).to({startPosition:69},0).wait(1).to({startPosition:70},0).wait(1).to({startPosition:71},0).wait(1).to({startPosition:72},0).wait(1).to({startPosition:73},0).wait(1).to({startPosition:74},0).wait(1).to({startPosition:75},0).wait(1).to({startPosition:76},0).wait(1).to({startPosition:77},0).wait(1).to({startPosition:78},0).wait(1).to({startPosition:79},0).wait(1).to({startPosition:80},0).wait(1).to({startPosition:81},0).wait(1).to({startPosition:82},0).wait(1).to({startPosition:83},0).wait(1).to({startPosition:84},0).wait(1).to({startPosition:85},0).wait(1).to({startPosition:86},0).wait(1).to({startPosition:87},0).wait(1).to({startPosition:88},0).wait(1).to({startPosition:89},0).wait(1).to({startPosition:90},0).wait(1).to({startPosition:91},0).wait(1).to({startPosition:92},0).wait(1).to({startPosition:93},0).wait(1).to({startPosition:94},0).wait(1).to({startPosition:95},0).wait(1).to({startPosition:96},0).wait(1).to({startPosition:97},0).wait(1).to({startPosition:98},0).wait(1).to({startPosition:99},0).wait(1).to({startPosition:100},0).wait(1).to({startPosition:101},0).wait(1).to({startPosition:102},0).wait(1).to({startPosition:103},0).wait(1).to({startPosition:104},0).wait(1).to({startPosition:105},0).wait(1).to({startPosition:106},0).wait(1).to({startPosition:107},0).wait(1).to({startPosition:108},0).wait(1).to({startPosition:109},0).wait(1).to({startPosition:110},0).wait(1).to({startPosition:111},0).wait(1).to({startPosition:112},0).wait(1).to({startPosition:113},0).wait(1).to({startPosition:114},0).wait(1).to({startPosition:115},0).wait(1).to({startPosition:116},0).wait(1).to({startPosition:117},0).wait(1).to({startPosition:118},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_speach_bubble2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// speach_bubble2
	this.instance = new lib.bubble2("synched",0);
	this.instance.setTransform(881.05,540.95,0.1614,0.1614,0,0,0,249.8,166.7);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(471).to({_off:false},0).wait(1).to({regX:295.2,regY:205.3,scaleX:0.6101,scaleY:0.6101,x:672.65,y:513.45,startPosition:1},0).wait(1).to({scaleX:0.6188,scaleY:0.6188,x:668.45,y:512.8,startPosition:2},0).wait(1).to({startPosition:3},0).wait(1).to({startPosition:4},0).wait(1).to({startPosition:5},0).wait(1).to({startPosition:6},0).wait(1).to({startPosition:7},0).wait(1).to({startPosition:8},0).wait(1).to({startPosition:9},0).wait(1).to({startPosition:10},0).wait(1).to({startPosition:11},0).wait(1).to({startPosition:12},0).wait(1).to({startPosition:13},0).wait(1).to({startPosition:14},0).wait(1).to({startPosition:15},0).wait(1).to({startPosition:16},0).wait(1).to({startPosition:17},0).wait(1).to({startPosition:18},0).wait(1).to({startPosition:19},0).wait(1).to({startPosition:20},0).wait(1).to({startPosition:21},0).wait(1).to({startPosition:22},0).wait(1).to({startPosition:23},0).wait(1).to({startPosition:24},0).wait(1).to({startPosition:25},0).wait(1).to({startPosition:26},0).wait(1).to({startPosition:27},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_speach_bubble1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// speach_bubble1
	this.instance = new lib.bubble1("synched",0);
	this.instance.setTransform(795.6,395.4,0.1614,0.1614,0,0,0,249.8,166.7);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(426).to({_off:false},0).wait(1).to({regX:242.6,regY:240.1,scaleX:0.4945,scaleY:0.4945,x:728.45,y:349.75,startPosition:1},0).wait(1).to({scaleX:0.8229,scaleY:0.8229,x:663.45,y:293.1,startPosition:2},0).wait(1).to({scaleX:1,scaleY:1,x:628.35,y:262.6,startPosition:3},0).wait(1).to({startPosition:4},0).wait(1).to({startPosition:5},0).wait(1).to({startPosition:6},0).wait(1).to({startPosition:7},0).wait(1).to({startPosition:8},0).wait(1).to({startPosition:9},0).wait(1).to({startPosition:10},0).wait(1).to({startPosition:11},0).wait(1).to({startPosition:12},0).wait(1).to({startPosition:13},0).wait(1).to({startPosition:14},0).wait(1).to({startPosition:15},0).wait(1).to({startPosition:16},0).wait(1).to({startPosition:17},0).wait(1).to({startPosition:18},0).wait(1).to({startPosition:19},0).wait(1).to({startPosition:20},0).wait(1).to({startPosition:21},0).wait(1).to({startPosition:22},0).wait(1).to({startPosition:23},0).wait(1).to({startPosition:24},0).wait(1).to({startPosition:25},0).wait(1).to({startPosition:26},0).wait(1).to({startPosition:27},0).wait(1).to({startPosition:28},0).wait(1).to({startPosition:29},0).wait(1).to({startPosition:30},0).wait(1).to({startPosition:31},0).wait(1).to({startPosition:32},0).wait(1).to({startPosition:33},0).wait(1).to({startPosition:34},0).wait(1).to({startPosition:35},0).wait(1).to({startPosition:36},0).wait(1).to({startPosition:37},0).wait(1).to({startPosition:38},0).wait(1).to({startPosition:39},0).wait(1).to({startPosition:40},0).wait(1).to({startPosition:41},0).wait(1).to({startPosition:42},0).wait(1).to({startPosition:43},0).wait(1).to({startPosition:44},0).wait(1).to({startPosition:45},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:47},0).wait(1).to({startPosition:48},0).wait(1).to({startPosition:49},0).wait(1).to({startPosition:50},0).wait(1).to({startPosition:51},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:53},0).wait(1).to({startPosition:54},0).wait(1).to({startPosition:55},0).wait(1).to({startPosition:56},0).wait(1).to({startPosition:57},0).wait(1).to({startPosition:58},0).wait(1).to({startPosition:59},0).wait(1).to({startPosition:60},0).wait(1).to({startPosition:61},0).wait(1).to({startPosition:62},0).wait(1).to({startPosition:63},0).wait(1).to({startPosition:64},0).wait(1).to({startPosition:65},0).wait(1).to({startPosition:66},0).wait(1).to({startPosition:67},0).wait(1).to({startPosition:68},0).wait(1).to({startPosition:69},0).wait(1).to({startPosition:70},0).wait(1).to({startPosition:71},0).wait(1).to({startPosition:72},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_buttons = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// buttons
	this.start = new lib.button1();
	this.start.name = "start";
	this.start.setTransform(700,348.85);
	new cjs.ButtonHelper(this.start, 0, 1, 2);

	this.replay = new lib.button2();
	this.replay.name = "replay";
	this.replay.setTransform(628.85,219.4,1.3777,1.3777);
	new cjs.ButtonHelper(this.replay, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.start}]}).to({state:[]},2).to({state:[{t:this.replay}]},615).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_both_from_back = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// both_from_back
	this.instance = new lib.backsandhill("synched",0);
	this.instance.setTransform(643.05,1173.9,1,1,0,0,0,896.4,342.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(251).to({_off:false},0).wait(1).to({regY:342,y:1159.6},0).wait(1).to({y:1145.6},0).wait(1).to({y:1131.85},0).wait(1).to({y:1118.3},0).wait(1).to({y:1105},0).wait(1).to({y:1091.9},0).wait(1).to({y:1079},0).wait(1).to({y:1066.35},0).wait(1).to({y:1053.9},0).wait(1).to({y:1041.7},0).wait(1).to({y:1029.7},0).wait(1).to({y:1017.9},0).wait(1).to({y:1006.35},0).wait(1).to({y:995.05},0).wait(1).to({y:983.9},0).wait(1).to({y:973},0).wait(1).to({y:962.35},0).wait(1).to({y:951.9},0).wait(1).to({y:941.65},0).wait(1).to({y:931.6},0).wait(1).to({y:921.85},0).wait(1).to({y:912.25},0).wait(1).to({y:902.9},0).wait(1).to({y:893.75},0).wait(1).to({y:884.85},0).wait(1).to({y:876.15},0).wait(1).to({y:867.7},0).wait(1).to({y:859.4},0).wait(1).to({y:851.4},0).wait(1).to({y:843.55},0).wait(1).to({y:835.95},0).wait(1).to({y:828.6},0).wait(1).to({y:821.45},0).wait(1).to({y:814.5},0).wait(1).to({y:807.8},0).wait(1).to({y:801.3},0).wait(1).to({y:795.05},0).wait(1).to({y:789},0).wait(1).to({y:783.15},0).wait(1).to({y:777.55},0).wait(1).to({y:772.15},0).wait(1).to({y:766.95},0).wait(1).to({y:762},0).wait(1).to({y:757.3},0).wait(1).to({y:752.75},0).wait(1).to({y:748.45},0).wait(1).to({y:744.4},0).wait(1).to({y:740.55},0).wait(1).to({y:736.9},0).wait(1).to({y:733.5},0).wait(1).to({y:730.3},0).wait(1).to({y:727.35},0).wait(1).to({y:724.6},0).wait(1).to({y:722.05},0).wait(1).to({y:719.75},0).wait(1).to({y:717.65},0).wait(1).to({y:715.8},0).wait(1).to({y:714.15},0).wait(1).to({y:712.7},0).wait(1).to({y:711.5},0).wait(1).to({y:710.5},0).wait(1).to({y:709.75},0).wait(1).to({y:709.2},0).wait(1).to({y:708.85},0).wait(1).to({y:708.75},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_background = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// background
	this.instance = new lib.backgroundgraphic("synched",0);
	this.instance.setTransform(668.2,375.6,1,1,0,0,0,902.8,549.5);

	this.instance_1 = new lib.background2("synched",0,false);
	this.instance_1.setTransform(628.15,676.2,1,1,0,0,0,976.2,228.1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#95E5FC").ss(1,1,1).p("EiYhgjoMExDAAAMAAABHRMkxDAAAg");
	this.shape.setTransform(628.175,676.175);

	this.instance_2 = new lib.sky3("synched",0);
	this.instance_2.setTransform(605.6,389.55,1,1,0,0,0,821.6,476);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#726864").s().p("Eip9BiuMAAAjFbMFT7AAAMAAADFbg");
	this.shape_1.setTransform(753.125,369.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{startPosition:0}}]}).to({state:[{t:this.instance,p:{startPosition:1}}]},1).to({state:[{t:this.shape},{t:this.instance_1}]},183).to({state:[{t:this.instance_2}]},133).to({state:[{t:this.shape_1}]},58).wait(244));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.johnnytalking = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.johnnyheadtalking();
	this.instance.setTransform(296.75,264.2,1,1,-10.9708,0,0,128,283.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:105.1,regY:150.2,rotation:-10.6142,x:249.7,y:137.8},0).wait(1).to({rotation:-10.2571,x:250.5,y:137.5},0).wait(1).to({rotation:-9.8999,x:251.3,y:137.2},0).wait(1).to({rotation:-9.5428,x:252.1,y:136.95},0).wait(1).to({rotation:-9.1856,x:252.9,y:136.6},0).wait(1).to({rotation:-8.8285,x:253.7,y:136.35},0).wait(1).to({rotation:-8.4713,x:254.5,y:136.1},0).wait(1).to({rotation:-8.1142,x:255.3,y:135.85},0).wait(1).to({rotation:-7.757,x:256.05,y:135.55},0).wait(1).to({rotation:-7.3999,x:256.85,y:135.4},0).wait(1).to({rotation:-7.0427,x:257.65,y:135.1},0).wait(1).to({rotation:-6.6856,x:258.5,y:134.9},0).wait(1).to({rotation:-6.3284,x:259.3,y:134.7},0).wait(1).to({rotation:-5.9713,x:260.1,y:134.45},0).wait(1).to({rotation:-5.6141,x:260.95,y:134.25},0).wait(1).to({rotation:-5.257,x:261.7,y:133.95},0).wait(1).to({rotation:-4.8998,x:262.55,y:133.75},0).wait(1).to({rotation:-4.5427,x:263.35,y:133.6},0).wait(1).to({rotation:-4.1855,x:264.15,y:133.4},0).wait(1).to({rotation:-3.8284,x:265,y:133.15},0).wait(1).to({rotation:-3.4712,x:265.8,y:132.95},0).wait(1).to({rotation:-3.1141,x:266.6,y:132.8},0).wait(1).to({rotation:-2.7569,x:267.45,y:132.65},0).wait(1).to({rotation:-2.3998,x:268.25,y:132.4},0).wait(1).to({rotation:-2.0426,x:269.1,y:132.25},0).wait(1).to({rotation:-1.6855,x:269.9,y:132.1},0).wait(1).to({rotation:-1.3283,x:270.75,y:131.9},0).wait(1).to({rotation:-0.9712,x:271.6,y:131.75},0).wait(1).to({rotation:-0.614,x:272.4,y:131.6},0).wait(1).to({rotation:-0.2569,x:273.2,y:131.5},0).wait(1).to({rotation:0.1003,x:274.05,y:131.35},0).wait(1).to({rotation:0.4574,x:274.9,y:131.2},0).wait(1).to({rotation:0.8146,x:275.7,y:131.05},0).wait(1).to({rotation:1.1717,x:276.6,y:130.9},0).wait(1).to({rotation:1.5289,x:277.35,y:130.8},0).wait(1).to({rotation:1.886,x:278.2,y:130.65},0).wait(1).to({rotation:2.2432,x:279,y:130.55},0).wait(1).to({rotation:2.6003,x:279.9,y:130.45},0).wait(1).to({rotation:2.9575,x:280.7,y:130.35},0).wait(1).to({rotation:3.3146,x:281.5,y:130.3},0).wait(1).to({rotation:3.6718,x:282.4,y:130.2},0).wait(1).to({rotation:4.029,x:283.2,y:130.1},0).wait(1).to({rotation:3.7029,x:282.45,y:130.2},0).wait(1).to({rotation:3.3768,x:281.65,y:130.25},0).wait(1).to({rotation:3.0507,x:280.9,y:130.35},0).wait(1).to({rotation:2.7246,x:280.15,y:130.45},0).wait(1).to({rotation:2.3985,x:279.35,y:130.5},0).wait(1).to({rotation:2.0724,x:278.65,y:130.6},0).wait(1).to({rotation:1.7463,x:277.85,y:130.75},0).wait(1).to({rotation:1.4202,x:277.1,y:130.8},0).wait(1).to({rotation:1.0941,x:276.4,y:130.9},0).wait(1).to({rotation:0.768,x:275.6,y:131.05},0).wait(1).to({rotation:0.4419,x:274.85,y:131.15},0).wait(1).to({rotation:0.1158,x:274.1,y:131.3},0).wait(1).to({rotation:-0.2103,x:273.3,y:131.4},0).wait(1).to({rotation:-0.5364,x:272.55,y:131.55},0).wait(1).to({rotation:-0.8625,x:271.8,y:131.7},0).wait(1).to({rotation:-1.1886,x:271.05,y:131.8},0).wait(1).to({rotation:-1.5147,x:270.25,y:132},0).wait(1).to({rotation:-1.8408,x:269.55,y:132.1},0).wait(1).to({rotation:-2.1668,x:268.8,y:132.35},0).wait(1).to({rotation:-2.4929,x:268.05,y:132.5},0).wait(1).to({rotation:-2.819,x:267.3,y:132.65},0).wait(1).to({rotation:-3.1451,x:266.55,y:132.8},0).wait(1).to({rotation:-3.4712,x:265.8,y:132.95},0).wait(1).to({rotation:-3.7973,x:265.05,y:133.15},0).wait(1).to({rotation:-4.1234,x:264.35,y:133.35},0).wait(1).to({rotation:-4.4495,x:263.6,y:133.55},0).wait(1).to({rotation:-4.7756,x:262.85,y:133.75},0).wait(1).to({rotation:-5.1017,x:262.1,y:133.9},0).wait(1).to({rotation:-5.4278,x:261.35,y:134.1},0).wait(1).to({rotation:-5.7539,x:260.55,y:134.3},0).wait(1).to({rotation:-6.08,x:259.85,y:134.5},0).wait(1).to({rotation:-6.4061,x:259.1,y:134.7},0).wait(1).to({rotation:-6.7322,x:258.4,y:134.95},0).wait(1).to({rotation:-7.0583,x:257.65,y:135.15},0).wait(1).to({rotation:-7.3844,x:256.95,y:135.4},0).wait(1).to({rotation:-7.7105,x:256.2,y:135.6},0).wait(1).to({rotation:-8.0365,x:255.45,y:135.75},0).wait(1).to({rotation:-8.3626,x:254.75,y:136},0).wait(1).to({rotation:-8.6887,x:254,y:136.25},0).wait(1).to({rotation:-9.0148,x:253.3,y:136.55},0).wait(1).to({rotation:-9.3409,x:252.55,y:136.75},0).wait(1).to({rotation:-9.667,x:251.8,y:137},0).wait(1).to({rotation:-9.9931,x:251.1,y:137.25},0).wait(1).to({rotation:-10.3192,x:250.35,y:137.5},0).wait(1).to({rotation:-10.6453,x:249.65,y:137.8},0).wait(1).to({rotation:-10.9714,x:248.95,y:138.1},0).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0033CC").s().p("AMrckQg/gRg0hFQgZgjg0hjQgvhYhFhkQguhChVhwQhdh7g2hBQhVhmhOhJQiJiDiqhdQhmg3hjgiQhTgdh9gdQiOgehGgRQj8g9iJhmQgwgjhBhAIhrhpIijiIQhghSgyhFQg9hVgDhNQAAgJABgJQCCglC0gjQBqgWDVgnQEtg6DNhCIBCgGQCAgPCLg2QBigmBzg+IBPhwQBch/BRhgQBXhnBIg4QAsgjBIgrIB4hIQA4gjBihIQBphNAwggQB5hPBggcQBHgUBUgDIABAAQBdgrBsAGQBpAGBcAzQBZAwBDBVQBBBRAgBlQAnB4gCCwQgCCyg7F2Qg6FoACC/QABBAgDAbQgHAygXAhQg7BViygPQhlgJh8gXQhMgOiSggQhDgQgjgOQg3gXgcgmQglgwADhOQABguAVheQAdiBAXi/IAGg2Ig4BMQgsA6grAnQgkAjgzAkQgiAYg8AmQhpBBhKAoIAsAcQBRAzAqAdQBCAwAuAuQAuAtAxBHIBUB+QDDEpDtEHQAiAlAVAUQAgAdAeASIA+AgQAnASAVARQAeAZAQAlIAGADQApAUAWAlQAWAmgCAtQgDAugaAiQgUAagoAZIhGAoQg8Amg7BCQglApg+BVQgfAsgLAYIgLAeQgHATgFAKQgWAxgyAcQgxAcg1gGQgZgCgWgKQgeAhgtANQgZAIgYAAQgUAAgUgGg");
	this.shape.setTransform(333.8465,644.8718);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(89));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E4A985").s().p("ARDdHQiUgbhDhOQgxg5gEhQIAAgdIgYgMQg4gdhEg2Qh7hig+hgIglg+IgDgGQgpgcgrgrQhKhQgmgnQgogphLhAQhWhLgfgdQgwguhEhKIhxh8QiKiThzhFQhIgrhQgbQhRgbhxgRIjHgXQj8gciBhEQhGglhOhCQgTgQh0hpIiIh9QhLhKgshCQgXgigUglQBzgdCPgrQFShmCDgcQB/gbECgsQDgguCOhPQBog6BthjQBKhEBvh8QBqh4A1hMIAWghQCCg8DMh9QD0iVBagvQBig0BLgYQBigeBWAHQBoAJBYBCQBYBBAmBhQAeBMABBoQABA8gNB+QgvHpABHrQAABggCApQgEBMgOA7QgOA5gaAwIB8BDQA/AjAeAVQAxAiAdAmQApA3AHBHQAHBHgfA9QgeA9g+AkQg9AlhEgEQgugDg0gWQgggNg8ggQh6hDg5gpIg0gmQgfgXgXgNQgSgKhtgvQhOghgngmQgogogTg9QgSg3ADhAQACg2AQg/QAJgjAUg/QgPhIgChUQgDhQAKiVQAKieAAhHQg6AxhPArIgCADQgcAlgrAmQgaAYg3AqQg9AwgiAZQg1AmguAbQhuA+iZAnQBdAZA0ATQBjAkBGAvQB8BVB0DBIBfClQA5BjAsA9QAaAkBBBQQA9BKAeAsIAXAjIBGAzQDaCkBGC0IAJAbIALgJIBPg7QAxglAdgZIBAg5QAmgiAggRQBNgqBeAQQBdARA6BDQA0A7AOBVQAOBQgWBTQgTBIgtBMQgkA8g7BJQhhB3hhBLQh2Bah7AeQhCAQhIAAQg/AAhEgMg");
	this.shape_1.setTransform(354.6604,653.2296);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(89));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6633FF").s().p("AzHaKQgtgMgdgdQgugsgHhQQgFg3ANhbQA+mjAtmzQAXjSAIhBQAUiaAch1QAKgpAMgmQgkASgjADQgwAFgxgXQgugWgjgoQgJgJgtg8QgggqgbgUQgagShNgdQhEgagcgeQgXgXgJghQgKggAGggQAFgdARgaQgKgRgEgUQgJgrATg0QANgjAhg2QA2haAggxQAyhMAvg4QAYgcApgsIBChGQBehuAwg1QBVheBKgyQBSg3BwgjQBWgcB9gUQBMgNA1gEQBGgEA6AKQA3AJAvAXQAQAAASAEQAzALAeAnQAOATAPAjQARAqAIAOQApBFBeAiQAlANAwAIQAcAEA7AGIDXAXQA5AGAcgFQAxgIAWgiQALgQAGgbQAFgfAEgPQAMgtAlghQAmghAugFQAugGAsAXQASgJAVgGQA5gQA+AJQBhAOB3BPQB4BQBIBVQA9BJA2BqQAiBDA1CCQAqBmATA/QAZBTATCOQAXCxAKA0QATBdABAnQACBLgkAsQglAuhJANQgvAIhYgEQifgGieALIhLADQgqABgggFIgPgDIgnKqQgHBxgEA5QgIBegKBLQgJA+gMAqQgRA4gcAnQgpA6hNAnQg6AdhaAWQiMAjjHAWQjkAWhxANQniA2l/CBQg9AVgVAGQgvANgmADIgVAAQgiAAgegIg");
	this.shape_2.setTransform(266.9544,445.1474);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(89));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4A985").s().p("EgfCAipQg2gMgkgxQgkgxADg4QAEg4AngtQAogtA3gMQgjgSgzgKIhbgMQg3gHgkgNQgwgQgdgeQgagagMgkQgMgkAEglQAFglAUggQATghAegWIAYgQQAOgJAIgJQALgMAPgeQAigzBHgRQAcgHAjgCQAWgBAqAAQBJAAAkACQA9AEAwAKIAFABIDOujQAciDAThLQAdhxAghZQAsh9BWirQCSkkCSjDQC6j2DbiMQDTiGC1ANQB5AIB3BIQAagLARgMQBFgtAshvQBPjAgNkOQgEhWADghQAFhCAdgqQAfgvA7gSIAMgEQAPgdAYgZQAogsA3gRQA3gSA6AMQA7AMArAmQA1AtAcBQQAVA9AIBaQACAWALDcQAHCSAVBeQAOBAAdBNQAQAtAmBdQAJATAHAGQAHAFAMACIAVABQAfABAeAKIAQgHQBbgiBXAMQB2ARBrBnQBOBLBXCKQBBBmAnBKQA0BjAcBZQAtCOAJDAQADBTgGECQgJGaAcGbIACgCIAXgbQANgPANgGQAPgIAUgCQANgBAYAAQAYABANADQAUAFALALQAPAOAGAeIAKA0QAQAAAigEQAhgEASAAQA9AAAfAhQAWAXAFAlQAFApgQAsQgOAngeAjQgaAegmAdIgyAjQAKAAAJACQAsAKAfAlQAfAlACAtQACAtgcAoQgbAngsAOQgTAFgZACQgQABgcgBQhygEg0gEQhcgHhHgRQgogJgWgNQgvARgzAAQhOABhHgoQhHgngqhCQgrhDgPhiQgJg9gCh1IgSzTIgBgwQgpDcgXCMQhEGZgXFLQgHBgAABBQAABXAMBIQAKA5AWBMQANAsAdBXIAZBOIgFgCQhtg7iDACQiBADhuA8Ig+AkQgkAVgdAHQgUAFgZABQgRABgeAAQhPgEgogBQhFAAgyAJQgtAJhOAdQhTAfgnAJQhLASiRgEQibgDhFAMQiPAZhxBlQgwhRgghRQhMjBgPkDQgJihAQk0QAIiqAHhcQALiRATh0QAUh9AmiZQAYhiAyixQggA6gmBIQg2BlgbA3QgrBYgdBJQgiBVghBwQgTA+glCLQhREygkCTQg+D9glDMQgVBwgOAxQgbBYguA4QgqAzg7AaQgdAqgrAeQgfAWgsASQgaALg3ATIjBBBQg2ASgdAFQgXAFgVAAQgVAAgTgFg");
	this.shape_3.setTransform(236.384,405.9184);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(89));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-28.3,551.4,869.0999999999999);


(lib.johnnyquiet = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.johnnyheadquiet();
	this.instance.setTransform(296.7,264.1,1,1,2.0287,0,0,128.6,282.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(52).to({_off:false},0).wait(1).to({regX:105.1,regY:150.2,rotation:2.2789,x:278.5,y:131.15},0).wait(1).to({rotation:2.5289,x:279.05,y:131.05},0).wait(1).to({rotation:2.7789,x:279.6,y:130.95},0).wait(1).to({rotation:3.0289,x:280.2,y:130.9},0).wait(1).to({rotation:3.2789,x:280.8,y:130.8},0).wait(1).to({rotation:3.5289,x:281.35,y:130.7},0).wait(1).to({rotation:3.7789,x:281.95},0).wait(1).to({rotation:4.029,x:282.55,y:130.65},0).wait(1).to({rotation:3.8206,x:282.05},0).wait(1).to({rotation:3.6123,x:281.6,y:130.7},0).wait(1).to({rotation:3.4039,x:281.1,y:130.8},0).wait(1).to({rotation:3.1956,x:280.65},0).wait(1).to({rotation:2.9873,x:280.1,y:130.95},0).wait(1).to({rotation:2.7789,x:279.6},0).wait(1).to({rotation:2.5706,x:279.15,y:131},0).wait(1).to({rotation:2.3622,x:278.65,y:131.1},0).wait(1).to({rotation:2.1539,x:278.15,y:131.15},0).wait(1).to({rotation:1.9456,x:277.7,y:131.2},0).wait(1).to({rotation:1.7372,x:277.2,y:131.35},0).wait(1).to({rotation:1.5289,x:276.75},0).wait(1).to({rotation:1.3206,x:276.25,y:131.4},0).wait(1).to({rotation:1.1122,x:275.8,y:131.5},0).wait(1).to({rotation:0.9039,x:275.3,y:131.6},0).wait(1).to({rotation:0.6955,x:274.85,y:131.65},0).wait(1).to({rotation:0.4872,x:274.3,y:131.75},0).wait(1).to({rotation:0.2789,x:273.8,y:131.8},0).wait(1).to({rotation:0.0705,x:273.35,y:131.95},0).wait(1).to({rotation:-0.1378,x:272.85,y:132},0).wait(1).to({rotation:-0.3462,x:272.4,y:132.1},0).wait(1).to({rotation:-0.5545,x:271.9,y:132.2},0).wait(1).to({rotation:-0.7628,x:271.45,y:132.3},0).wait(1).to({rotation:-0.9712,x:270.95,y:132.35},0).wait(1).to({rotation:-1.1795,x:270.5,y:132.45},0).wait(1).to({rotation:-1.3878,x:270,y:132.55},0).wait(1).to({rotation:-1.5962,x:269.55,y:132.65},0).wait(1).to({rotation:-1.8045,x:269.05,y:132.75},0).wait(1).to({rotation:-2.0129,x:268.55,y:132.85},0).wait(1).to({rotation:-2.2212,x:268.05,y:133},0).wait(1).to({rotation:-2.4295,x:267.6,y:133.05},0).wait(1).to({rotation:-2.6379,x:267.15,y:133.15},0).wait(1).to({rotation:-2.8462,x:266.65,y:133.3},0).wait(1).to({rotation:-3.0546,x:266.2,y:133.4},0).wait(1).to({rotation:-3.2629,x:265.75,y:133.45},0).wait(1).to({rotation:-3.4712,x:265.25,y:133.6},0).wait(1).to({rotation:-3.6796,x:264.8,y:133.75},0).wait(1).to({rotation:-3.8879,x:264.3,y:133.8},0).wait(1).to({rotation:-4.0962,x:263.85,y:133.95},0).wait(1).to({rotation:-4.3046,x:263.3,y:134.1},0).wait(1).to({rotation:-4.5129,x:262.8,y:134.25},0).wait(1).to({rotation:-4.7213,x:262.4,y:134.35},0).wait(1).to({rotation:-4.9296,x:261.9,y:134.45},0).wait(1).to({rotation:-5.1379,x:261.45,y:134.6},0).wait(1).to({rotation:-5.3463,x:261,y:134.7},0).wait(1).to({rotation:-5.5546,x:260.5,y:134.85},0).wait(1).to({rotation:-5.7629,x:260.05,y:135},0).wait(1).to({rotation:-5.9713,x:259.55,y:135.1},0).wait(1).to({rotation:-6.1796,x:259.1,y:135.3},0).wait(1).to({rotation:-6.388,x:258.6,y:135.35},0).wait(1).to({rotation:-6.5963,x:258.15,y:135.55},0).wait(1).to({rotation:-6.8046,x:257.7,y:135.65},0).to({_off:true},1).wait(20));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0033CC").s().p("AMrckQg/gRg0hFQgZgjg0hjQgvhYhFhkQguhChVhwQhdh7g2hBQhVhmhOhJQiJiDiqhdQhmg3hjgiQhTgdh9gdQiOgehGgRQj8g9iJhmQgwgjhBhAIhrhpIijiIQhghSgyhFQg9hVgDhNQAAgJABgJQCCglC0gjQBqgWDVgnQEtg6DNhCIBCgGQCAgPCLg2QBigmBzg+IBPhwQBch/BRhgQBXhnBIg4QAsgjBIgrIB4hIQA4gjBihIQBphNAwggQB5hPBggcQBHgUBUgDIABAAQBdgrBsAGQBpAGBcAzQBZAwBDBVQBBBRAgBlQAnB4gCCwQgCCyg7F2Qg6FoACC/QABBAgDAbQgHAygXAhQg7BViygPQhlgJh8gXQhMgOiSggQhDgQgjgOQg3gXgcgmQglgwADhOQABguAVheQAdiBAXi/IAGg2Ig4BMQgsA6grAnQgkAjgzAkQgiAYg8AmQhpBBhKAoIAsAcQBRAzAqAdQBCAwAuAuQAuAtAxBHIBUB+QDDEpDtEHQAiAlAVAUQAgAdAeASIA+AgQAnASAVARQAeAZAQAlIAGADQApAUAWAlQAWAmgCAtQgDAugaAiQgUAagoAZIhGAoQg8Amg7BCQglApg+BVQgfAsgLAYIgLAeQgHATgFAKQgWAxgyAcQgxAcg1gGQgZgCgWgKQgeAhgtANQgZAIgYAAQgUAAgUgGg");
	this.shape.setTransform(333.8465,644.8718);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(52).to({_off:false},0).wait(60).to({_off:true},1).wait(20));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E4A985").s().p("ARDdHQiUgbhDhOQgxg5gEhQIAAgdIgYgMQg4gdhEg2Qh7hig+hgIglg+IgDgGQgpgcgrgrQhKhQgmgnQgogphLhAQhWhLgfgdQgwguhEhKIhxh8QiKiThzhFQhIgrhQgbQhRgbhxgRIjHgXQj8gciBhEQhGglhOhCQgTgQh0hpIiIh9QhLhKgshCQgXgigUglQBzgdCPgrQFShmCDgcQB/gbECgsQDgguCOhPQBog6BthjQBKhEBvh8QBqh4A1hMIAWghQCCg8DMh9QD0iVBagvQBig0BLgYQBigeBWAHQBoAJBYBCQBYBBAmBhQAeBMABBoQABA8gNB+QgvHpABHrQAABggCApQgEBMgOA7QgOA5gaAwIB8BDQA/AjAeAVQAxAiAdAmQApA3AHBHQAHBHgfA9QgeA9g+AkQg9AlhEgEQgugDg0gWQgggNg8ggQh6hDg5gpIg0gmQgfgXgXgNQgSgKhtgvQhOghgngmQgogogTg9QgSg3ADhAQACg2AQg/QAJgjAUg/QgPhIgChUQgDhQAKiVQAKieAAhHQg6AxhPArIgCADQgcAlgrAmQgaAYg3AqQg9AwgiAZQg1AmguAbQhuA+iZAnQBdAZA0ATQBjAkBGAvQB8BVB0DBIBfClQA5BjAsA9QAaAkBBBQQA9BKAeAsIAXAjIBGAzQDaCkBGC0IAJAbIALgJIBPg7QAxglAdgZIBAg5QAmgiAggRQBNgqBeAQQBdARA6BDQA0A7AOBVQAOBQgWBTQgTBIgtBMQgkA8g7BJQhhB3hhBLQh2Bah7AeQhCAQhIAAQg/AAhEgMg");
	this.shape_1.setTransform(354.6604,653.2296);
	this.shape_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(52).to({_off:false},0).wait(60).to({_off:true},1).wait(20));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6633FF").s().p("AzHaKQgtgMgdgdQgugsgHhQQgFg3ANhbQA+mjAtmzQAXjSAIhBQAUiaAch1QAKgpAMgmQgkASgjADQgwAFgxgXQgugWgjgoQgJgJgtg8QgggqgbgUQgagShNgdQhEgagcgeQgXgXgJghQgKggAGggQAFgdARgaQgKgRgEgUQgJgrATg0QANgjAhg2QA2haAggxQAyhMAvg4QAYgcApgsIBChGQBehuAwg1QBVheBKgyQBSg3BwgjQBWgcB9gUQBMgNA1gEQBGgEA6AKQA3AJAvAXQAQAAASAEQAzALAeAnQAOATAPAjQARAqAIAOQApBFBeAiQAlANAwAIQAcAEA7AGIDXAXQA5AGAcgFQAxgIAWgiQALgQAGgbQAFgfAEgPQAMgtAlghQAmghAugFQAugGAsAXQASgJAVgGQA5gQA+AJQBhAOB3BPQB4BQBIBVQA9BJA2BqQAiBDA1CCQAqBmATA/QAZBTATCOQAXCxAKA0QATBdABAnQACBLgkAsQglAuhJANQgvAIhYgEQifgGieALIhLADQgqABgggFIgPgDIgnKqQgHBxgEA5QgIBegKBLQgJA+gMAqQgRA4gcAnQgpA6hNAnQg6AdhaAWQiMAjjHAWQjkAWhxANQniA2l/CBQg9AVgVAGQgvANgmADIgVAAQgiAAgegIg");
	this.shape_2.setTransform(266.9544,445.1474);
	this.shape_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(52).to({_off:false},0).wait(60).to({_off:true},1).wait(20));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4A985").s().p("EgfCAipQg2gMgkgxQgkgxADg4QAEg4AngtQAogtA3gMQgjgSgzgKIhbgMQg3gHgkgNQgwgQgdgeQgagagMgkQgMgkAEglQAFglAUggQATghAegWIAYgQQAOgJAIgJQALgMAPgeQAigzBHgRQAcgHAjgCQAWgBAqAAQBJAAAkACQA9AEAwAKIAFABIDOujQAciDAThLQAdhxAghZQAsh9BWirQCSkkCSjDQC6j2DbiMQDTiGC1ANQB5AIB3BIQAagLARgMQBFgtAshvQBPjAgNkOQgEhWADghQAFhCAdgqQAfgvA7gSIAMgEQAPgdAYgZQAogsA3gRQA3gSA6AMQA7AMArAmQA1AtAcBQQAVA9AIBaQACAWALDcQAHCSAVBeQAOBAAdBNQAQAtAmBdQAJATAHAGQAHAFAMACIAVABQAfABAeAKIAQgHQBbgiBXAMQB2ARBrBnQBOBLBXCKQBBBmAnBKQA0BjAcBZQAtCOAJDAQADBTgGECQgJGaAcGbIACgCIAXgbQANgPANgGQAPgIAUgCQANgBAYAAQAYABANADQAUAFALALQAPAOAGAeIAKA0QAQAAAigEQAhgEASAAQA9AAAfAhQAWAXAFAlQAFApgQAsQgOAngeAjQgaAegmAdIgyAjQAKAAAJACQAsAKAfAlQAfAlACAtQACAtgcAoQgbAngsAOQgTAFgZACQgQABgcgBQhygEg0gEQhcgHhHgRQgogJgWgNQgvARgzAAQhOABhHgoQhHgngqhCQgrhDgPhiQgJg9gCh1IgSzTIgBgwQgpDcgXCMQhEGZgXFLQgHBgAABBQAABXAMBIQAKA5AWBMQANAsAdBXIAZBOIgFgCQhtg7iDACQiBADhuA8Ig+AkQgkAVgdAHQgUAFgZABQgRABgeAAQhPgEgogBQhFAAgyAJQgtAJhOAdQhTAfgnAJQhLASiRgEQibgDhFAMQiPAZhxBlQgwhRgghRQhMjBgPkDQgJihAQk0QAIiqAHhcQALiRATh0QAUh9AmiZQAYhiAyixQggA6gmBIQg2BlgbA3QgrBYgdBJQgiBVghBwQgTA+glCLQhREygkCTQg+D9glDMQgVBwgOAxQgbBYguA4QgqAzg7AaQgdAqgrAeQgfAWgsASQgaALg3ATIjBBBQg2ASgdAFQgXAFgVAAQgVAAgTgFg");
	this.shape_3.setTransform(236.384,405.9184);
	this.shape_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(52).to({_off:false},0).wait(60).to({_off:true},1).wait(20));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-16.8,551.4,857.5999999999999);


(lib.girltalking = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// head
	this.instance = new lib.girlheadtalking();
	this.instance.setTransform(79.95,60.95,1,1,0.1635,0,0,91.4,265.6);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(1).to({regX:105.8,regY:135.9,rotation:0.3282,x:95.1,y:-68.65},0).wait(1).to({rotation:0.4923,x:95.5,y:-68.6},0).wait(1).to({rotation:0.6564,x:95.85,y:-68.55},0).wait(1).to({rotation:0.8205,x:96.25,y:-68.5},0).wait(1).to({rotation:0.9846,x:96.6,y:-68.45},0).wait(1).to({rotation:1.1488,x:97},0).wait(1).to({rotation:1.3129,x:97.35,y:-68.4},0).wait(1).to({rotation:1.477,x:97.7,y:-68.3},0).wait(1).to({rotation:1.6411,x:98.05,y:-68.25},0).wait(1).to({rotation:1.8052,x:98.45,y:-68.15},0).wait(1).to({rotation:1.9693,x:98.85},0).wait(1).to({rotation:2.1334,x:99.2,y:-68.1},0).wait(1).to({rotation:2.2975,x:99.55,y:-68},0).wait(1).to({rotation:2.4616,x:99.85},0).wait(1).to({rotation:2.6257,x:100.25,y:-67.95},0).wait(1).to({rotation:2.7898,x:100.6,y:-67.85},0).wait(1).to({rotation:2.9539,x:100.95},0).wait(1).to({rotation:3.118,x:101.35,y:-67.75},0).wait(1).to({rotation:3.2821,x:101.7,y:-67.65},0).wait(1).to({rotation:3.4463,x:102.1},0).wait(1).to({rotation:3.6104,x:102.45,y:-67.55},0).wait(1).to({rotation:3.7745,x:102.8,y:-67.5},0).wait(1).to({rotation:3.9386,x:103.15,y:-67.4},0).wait(1).to({rotation:4.1027,x:103.6},0).wait(1).to({rotation:4.2668,x:103.95,y:-67.35},0).wait(1).to({rotation:4.4309,x:104.3,y:-67.25},0).wait(1).to({rotation:4.595,x:104.65,y:-67.15},0).wait(1).to({rotation:4.7591,x:105.05,y:-67.05},0).wait(1).to({rotation:4.9232,x:105.4,y:-67},0).wait(1).to({rotation:5.0873,x:105.8,y:-66.95},0).wait(1).to({rotation:5.2514,x:106.1,y:-66.8},0).wait(1).to({rotation:5.4155,x:106.5,y:-66.75},0).wait(1).to({rotation:5.5796,x:106.85,y:-66.7},0).wait(1).to({rotation:5.7438,x:107.2,y:-66.65},0).wait(1).to({rotation:5.9079,x:107.6,y:-66.5},0).wait(1).to({rotation:6.072,x:107.95,y:-66.45},0).wait(1).to({rotation:6.2361,x:108.3,y:-66.35},0).wait(1).to({rotation:6.4002,x:108.7,y:-66.3},0).wait(1).to({rotation:6.5643,x:109.05,y:-66.25},0).wait(1).to({rotation:6.7284,x:109.4,y:-66.15},0).wait(1).to({rotation:6.8925,x:109.8,y:-66.05},0).wait(1).to({rotation:7.0566,x:110.15,y:-66},0).wait(1).to({rotation:7.2207,x:110.45,y:-65.9},0).wait(1).to({rotation:7.3848,x:110.85,y:-65.8},0).wait(1).to({rotation:7.5489,x:111.25,y:-65.7},0).wait(1).to({rotation:7.713,x:111.6,y:-65.65},0).wait(1).to({rotation:7.6178,x:111.4,y:-65.7},0).wait(1).to({rotation:7.5226,x:111.15},0).wait(1).to({rotation:7.4274,x:110.95,y:-65.75},0).wait(1).to({rotation:7.3321,x:110.75,y:-65.8},0).wait(1).to({rotation:7.2369,x:110.55,y:-65.85},0).wait(1).to({rotation:7.1417,x:110.35,y:-65.9},0).wait(1).to({rotation:7.0465,x:110.15,y:-65.95},0).wait(1).to({rotation:6.9513,x:109.9,y:-66.05},0).wait(1).to({rotation:6.856,x:109.75},0).wait(1).to({rotation:6.7608,x:109.45,y:-66.15},0).wait(1).to({rotation:6.6656,x:109.3},0).wait(1).to({rotation:6.5704,x:109.05,y:-66.25},0).wait(1).to({rotation:6.4751,x:108.85},0).wait(1).to({rotation:6.3799,x:108.65,y:-66.35},0).wait(1).to({rotation:6.2847,x:108.4},0).wait(1).to({rotation:6.1895,x:108.25,y:-66.4},0).wait(1).to({rotation:6.0943,x:108},0).wait(1).to({rotation:5.999,x:107.75,y:-66.5},0).wait(1).to({rotation:5.9038,x:107.55},0).wait(1).to({rotation:5.8086,x:107.35,y:-66.6},0).wait(1).to({rotation:5.7134,x:107.1,y:-66.65},0).wait(1).to({rotation:5.6181,x:106.95,y:-66.7},0).wait(1).to({rotation:5.5229,x:106.7,y:-66.75},0).wait(1).to({rotation:5.4277,x:106.55},0).wait(1).to({rotation:5.3325,x:106.3,y:-66.8},0).wait(1).to({rotation:5.2372,x:106.1,y:-66.85},0).wait(1).to({rotation:5.142,x:105.85,y:-66.9},0).wait(1).to({rotation:5.0468,x:105.7,y:-67},0).wait(1).to({rotation:4.9516,x:105.45,y:-66.95},0).wait(1).to({rotation:4.8564,x:105.25,y:-67.05},0).wait(1).to({rotation:4.7611,x:105.05},0).wait(1).to({rotation:4.6659,x:104.8,y:-67.1},0).wait(1).to({rotation:4.5707,x:104.55,y:-67.15},0).wait(1).to({rotation:4.4755,x:104.4,y:-67.2},0).wait(1).to({rotation:4.3802,x:104.15},0).wait(1).to({rotation:4.285,x:103.95,y:-67.3},0).wait(1).to({rotation:4.1898,x:103.7},0).wait(1).to({rotation:4.0946,x:103.55,y:-67.35},0).wait(1).to({rotation:3.9994,x:103.3,y:-67.4},0).wait(1).to({rotation:3.9041,x:103.1,y:-67.45},0).wait(1).to({rotation:3.8089,x:102.85},0).wait(1).to({rotation:3.7137,x:102.7,y:-67.55},0).wait(1).to({rotation:3.6185,x:102.45,y:-67.5},0).wait(1).to({rotation:3.5232,x:102.25,y:-67.6},0).wait(1).to({rotation:3.428,x:102.05},0).wait(1).to({rotation:3.3328,x:101.8,y:-67.7},0).wait(1).to({rotation:3.2376,x:101.65},0).wait(1).to({rotation:3.1423,x:101.4,y:-67.75},0).wait(1).to({rotation:3.0471,x:101.2,y:-67.8},0).wait(1).to({rotation:2.9519,x:100.95},0).wait(1).to({rotation:2.8567,x:100.75,y:-67.85},0).wait(1).to({rotation:2.7615,x:100.55},0).wait(1).to({rotation:2.6662,x:100.35,y:-67.95},0).wait(1).to({rotation:2.571,x:100.1},0).wait(1).to({rotation:2.4758,x:99.9,y:-68},0).wait(1).to({rotation:2.3806,x:99.75},0).wait(1).to({rotation:2.2853,x:99.55,y:-68.05},0).wait(1).to({rotation:2.1901,x:99.3},0).wait(1).to({rotation:2.0949,x:99.15,y:-68.15},0).wait(1).to({rotation:1.9997,x:98.9},0).wait(1).to({rotation:1.9045,x:98.7,y:-68.2},0).wait(1).to({rotation:1.8092,x:98.45,y:-68.15},0).wait(1).to({rotation:1.714,x:98.25,y:-68.25},0).wait(1).to({rotation:1.6188,x:98},0).wait(1).to({rotation:1.5236,x:97.8,y:-68.3},0).wait(1).to({rotation:1.4283,x:97.55},0).wait(1).to({rotation:1.3331,x:97.35,y:-68.35},0).wait(1).to({rotation:1.2379,x:97.15,y:-68.4},0).wait(1).to({rotation:1.1427,x:97,y:-68.45},0).wait(1).to({rotation:1.0474,x:96.75,y:-68.4},0).wait(1).to({rotation:0.9522,x:96.55,y:-68.45},0).wait(1).to({rotation:0.857,x:96.3},0).wait(1).to({rotation:0.7618,x:96.1,y:-68.5},0).wait(1).to({rotation:0.6666,x:95.85},0).wait(1).to({rotation:0.5713,x:95.65,y:-68.55},0).to({_off:true},1).wait(6));

	// dress
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC3399").s().p("AE9a1QgOgFgagRQgagQgPgFQgagLgogBQguABgXgBQgngCgdgPQghgQgKgeQg+AUhCgCQhBgBg9gWQg2gXgcgIQgMgEgrgIQgigHgUgJQgcgLgSgWQgUgYACgbQglAAgggXQgggXgNgjQhmAPhrgEQgqgCgbgFQglgIgbgSQgegVgMgiQgMgkAQgdQhAASgkAFQg5AIgsgLQg0gMgigpQgkgsAJgwQg7AMgfACQgyAFgngJQgvgKghggQgkgigDgrQgDgeAPgmIAehAIAWgqQANgXAPgNQAigcA/ACQBJAKAjACQBhAHBug1QBIgiBzhUQBAguAfgYQAzgoAmgkQBZhTBBhqQAyhPAghWIgCgGQgdhVgWieQgYiugUhHIgcheQgRg5gGgnQgJhBALheQAQhqAFg1IAHhjQAFg6AIgnQAJgsAbhJIBpkoQAOgoANgUIAKgPQAHgsAJgYQAPgsAfgTQAcgSAkAGQAkAGAUAaQARAWAGAiQADAWAAApIgDDnQgBA7ADAgQAFAyAQAlQAlBUBoA1QBOApBeALQBZALBbgRQCvgjCTh9QBYhKAWhKQAKgeACgpIABhJQABgTACgRIABgNQAIg5AYghQAWgfAkgLQAmgNAfASQAdARANAoQAJAdACAwQAHCrgEDXIgBAvQAFB7APB3IAKBXQAFAygBAmQgEBegxB7QgcBGg+CKQg4CMgWCOIgIA0QAPAWANAZQAUAnAeBQQAfBRATAlQA2BqBuBjQBGA+CPBkIDLCOQAxAjAYATQAnAhAWAhQAcAnAGAtQAIAwgUAnQgbA1hHAXQgyARhTAEQgYA8hFAUQhFAVg0gmQggANgfBAQggBAgfAPQgXALg2gDQg2gEgXAMQgQAIgUAXQgXAagKAHQgeAYg6ACQhCgBggAEQgiAFgvATIhPAiQg7AYguAAQgbAAgXgJg");
	this.shape.setTransform(63.2089,220.5418);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(121).to({_off:true},1).wait(6));

	// other_hand
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFC3C3").s().p("ALNY+QgQgIgXgRIgmgbQgQgKgZgLIgpgUIgqgXQgTgIgRgNIgPgJQg/gegdgSQgzgegXglQgVghgDgoQgCgoAQgkQAQgkAggZQANgKAPgHIhAklQgWhlgGgnQgViGALiJQAEg1AIg1Qg4hVhpi7Qhpi4hEhfIgrg7QgagjgQgaQgSgegVgqIgjhKQhHiHgphXQhyhbiBhRQg/gogagVQgvgngTgrQgag7AZhCQAZhCA6gcIhegXQg5gNgjgOQgxgTgjgeQgogigQgqQgSgvAQgwQARgzAsgSQAdgMApAFIBJAOQAfAGA0AFQA/AGATADQBLAMBYAgQA8AWBhArQBEAfAmAUQA5AeArAfQAqAfAuAuQAdAbA1A6QBwB4AyBBQBRBqBKCTQAxBgBKCvIAJAUIADAGQANAbATA1QA4CfAUBFQBLEAAXFDQARDsgIFkQgCBEgEAiQgGAwgOAmIACABIBmBMIBFAsQAlAcATAdQAdAvgKA8QgLA7grAkQgqAkg7AFIgRAAQgwAAgrgXg");
	this.shape_1.setTransform(194.0182,225.8336);
	this.shape_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1).to({_off:false},0).wait(121).to({_off:true},1).wait(6));

	// legs
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFC3C3").s().p("AEHUKQhOgHg5gtQgegWgUgfQgVgggIgjQgKgxAOg/QAJglAchIQAdhKASg7IAxigQAihZA0gxQA2gzBOgOQBOgOBFAdIAJAFQAagNASgIQAvgUDjhGQBhgeBIgiIhcgMQjeggiUhDQhCgehMgvQgugehYg7QhjhEgwglQgsgiglghIgSAeQg+BjhfA7QgyAdhdAkIgPAGQAqASAlANIArAPIAUgIQAxgRAwAGQAwAHApAeQApAgARAtQAPAogEA1QgCAlgOA6QgfCBgqCBQgVBAgQAgQgRAigaAlQgSAaghAoQgYAbgNANQgVAWgVANQgyAghBgFQhAgEgygkQgrgggSgrQgNghgCg7QgDiIAjh/IhZgLQlMgpicgXQkPgojWguQhqgXhBgVQhcgfhDgsQhshHg6h0QgZgxgLgyQgsg9gIhUQgJhjAshaQAohTBPhCQBHg8BfgnQBPghBqgXQA8gNCDgUIFpg3QBzgSA9gMIAngJQAcgPApgeIBCgxIBHgtQAqgbAXgZQAbgdAihCQAlhGAWgbQAhgnAvgXQAvgXAyABQAzABAuAZQAvAaAZAsQAgA3gDBWQgBAygPBlQA1AQAkAvQAkAwgBA3QAAAhgNAjIAKAAQAmACApAZQALAGANAKQgQg+AFhDQAHhoA2hVQArhCBAgiQBIgmBBAWQAUAGATANQADgWATgVQAYgZAngRQA7gYA8gEQBAgFA3AUQAkAMAnAaQAYAQAsAhIDzC6QBxBWA/AzQBgBNBKBEQA0AyA4A6QBHAaA0AiQBgBABIBwQBGBrAgCBQAeB+gkBSIgHAQQACATABAUQACBegsBQQgfA6g6A2QgrAohIAyQh+BXhaAlQhdAmiZAZQiJAXitANQhnAJjQALQhYAFguAAQgUAdgIAQQgMAXgJAiIgPA6QgSA+gbA6QgdA5gdAZQgeAbgsALQgcAHgfAAIgagBg");
	this.shape_2.setTransform(49.8473,375.967);
	this.shape_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1).to({_off:false},0).wait(121).to({_off:true},1).wait(6));

	// torso
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFC3C3").s().p("Ag+ZhQiwgXifhLQiUhFhfhsQhth7gGiMQgChDAYhcQAghnANg0QAkiHAAiOQAAiNgliHQgJgjgfhdQgahRgLgvQgYhpABh9QAAhlASiDQAKhLAMgzQAPhEAYg2QAcg9ApgvQAtgyA4gbQA6gbB1gLQBagIA0gMIABgDQAFgTAHgnQAUhsAJhKQALhkgDhUQgCg7ABgMQABgnALgdQAQgqAngbQAogbAtAAQAsABAnAbQAnAbAQAqIACAFQANAHAOALQAiAaANAcQAKAVABAcIAAAbQAIAqgCA5QgCBJACAaQAEA2ATAlQAgA9BYApQAyAYBpAqQBAAgAzAyQA0AyAiA/QAwBbAWCXQAYCqgYB5QgMA9geBPQgRAtgmBZQheDsgSDXQgUD6BXDGIAxBnQAfA+ANArQASA7gEA3QgEA9ggAsQgiAvg+ALQgfAFgagHQgYA7gvAoQgmAgg3AUQgsAQg9ALQhhAShjAAQhLAAhMgLg");
	this.shape_3.setTransform(79.0043,164.3613);
	this.shape_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1).to({_off:false},0).wait(121).to({_off:true},1).wait(6));

	// Layer_1
	this.instance_1 = new lib.girlarmmoving("synched",0);
	this.instance_1.setTransform(18,116.3,1,1,-29.532,0,0,243.5,86.1);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({_off:false},0).wait(1).to({regX:114.7,regY:108.2,rotation:-29.0652,x:-83.85,y:198.15,startPosition:1},0).wait(1).to({rotation:-28.5981,x:-84.5,y:197.3,startPosition:2},0).wait(1).to({rotation:-28.1311,x:-85.15,y:196.45,startPosition:3},0).wait(1).to({rotation:-27.664,x:-85.75,y:195.65,startPosition:4},0).wait(1).to({rotation:-27.197,x:-86.45,y:194.85,startPosition:5},0).wait(1).to({rotation:-26.7299,x:-87.1,y:193.95,startPosition:6},0).wait(1).to({rotation:-26.2629,x:-87.7,y:193.1,startPosition:7},0).wait(1).to({rotation:-25.7958,x:-88.35,y:192.2,startPosition:8},0).wait(1).to({rotation:-25.3288,x:-88.95,y:191.35,startPosition:9},0).wait(1).to({rotation:-24.8618,x:-89.55,y:190.45,startPosition:10},0).wait(1).to({rotation:-24.3947,x:-90.15,y:189.6,startPosition:11},0).wait(1).to({rotation:-23.9277,x:-90.7,y:188.7,startPosition:12},0).wait(1).to({rotation:-23.4606,x:-91.3,y:187.85,startPosition:13},0).wait(1).to({rotation:-22.9936,x:-91.9,y:186.9,startPosition:14},0).wait(1).to({rotation:-22.5265,x:-92.5,y:186,startPosition:15},0).wait(1).to({rotation:-22.0595,x:-93.05,y:185.1,startPosition:16},0).wait(1).to({rotation:-21.5924,x:-93.6,y:184.2,startPosition:17},0).wait(1).to({rotation:-21.1254,x:-94.15,y:183.3,startPosition:18},0).wait(1).to({rotation:-20.6583,x:-94.75,y:182.4,startPosition:19},0).wait(1).to({rotation:-20.1913,x:-95.25,y:181.45,startPosition:20},0).wait(1).to({rotation:-19.7243,x:-95.8,y:180.55,startPosition:21},0).wait(1).to({rotation:-19.2572,x:-96.25,y:179.6,startPosition:22},0).wait(1).to({rotation:-18.7902,x:-96.8,y:178.7,startPosition:23},0).wait(1).to({rotation:-18.3231,x:-97.3,y:177.75,startPosition:24},0).wait(1).to({rotation:-17.8561,x:-97.8,y:176.85,startPosition:25},0).wait(1).to({rotation:-17.389,x:-98.3,y:175.8,startPosition:26},0).wait(1).to({rotation:-16.922,x:-98.75,y:174.85,startPosition:27},0).wait(1).to({rotation:-16.4549,x:-99.25,y:173.9,startPosition:28},0).wait(1).to({rotation:-15.9879,x:-99.7,y:172.95,startPosition:29},0).wait(1).to({rotation:-15.5209,x:-100.2,y:172,startPosition:30},0).wait(1).to({rotation:-15.0538,x:-100.65,y:171.05,startPosition:31},0).wait(1).to({rotation:-14.5868,x:-101.05,y:170.05,startPosition:32},0).wait(1).to({rotation:-14.1197,x:-101.45,y:169.1,startPosition:33},0).wait(1).to({rotation:-13.6527,x:-101.9,y:168.15,startPosition:34},0).wait(1).to({rotation:-13.1856,x:-102.3,y:167.2,startPosition:35},0).wait(1).to({rotation:-12.7186,x:-102.75,y:166.2,startPosition:36},0).wait(1).to({rotation:-12.2515,x:-103.15,y:165.2,startPosition:37},0).wait(1).to({rotation:-11.7845,x:-103.55,y:164.2,startPosition:38},0).wait(1).to({rotation:-11.3175,x:-103.95,y:163.25,startPosition:39},0).wait(1).to({rotation:-10.8504,x:-104.35,y:162.2,startPosition:40},0).wait(1).to({rotation:-10.3834,x:-104.7,y:161.25,startPosition:41},0).wait(1).to({rotation:-9.9163,x:-105,y:160.25,startPosition:42},0).wait(1).to({rotation:-9.4493,x:-105.4,y:159.2,startPosition:43},0).wait(1).to({rotation:-8.9822,x:-105.75,y:158.2,startPosition:44},0).wait(1).to({rotation:-8.5152,x:-106.1,y:157.15,startPosition:45},0).wait(1).to({rotation:-8.0481,x:-106.45,y:156.2,startPosition:46},0).wait(1).to({rotation:-7.5811,x:-106.75,y:155.15,startPosition:47},0).wait(1).to({rotation:-7.114,x:-107.05,y:154.15,startPosition:48},0).wait(1).to({rotation:-6.647,x:-107.35,y:153.1,startPosition:49},0).wait(1).to({rotation:-6.18,x:-107.65,y:152.1,startPosition:50},0).wait(1).to({rotation:-5.7129,x:-107.95,y:151.1,startPosition:51},0).wait(1).to({rotation:-5.2459,x:-108.25,y:150.05,startPosition:52},0).wait(1).to({rotation:-4.7788,x:-108.5,y:149,startPosition:53},0).wait(1).to({rotation:-4.3118,x:-108.75,y:148,startPosition:54},0).wait(1).to({rotation:-3.8447,x:-109,y:146.95,startPosition:55},0).wait(1).to({rotation:-3.3777,x:-109.25,y:145.9,startPosition:56},0).wait(1).to({rotation:-2.9106,x:-109.5,y:144.9,startPosition:57},0).wait(1).to({rotation:-2.4436,x:-109.7,y:143.85,startPosition:58},0).wait(1).to({rotation:-1.9766,x:-109.9,y:142.8,startPosition:59},0).wait(1).to({rotation:-1.5095,x:-110.15,y:141.75,startPosition:60},0).wait(1).to({rotation:-1.9347,x:-109.95,y:142.75,startPosition:61},0).wait(1).to({rotation:-2.3599,x:-109.75,y:143.65,startPosition:62},0).wait(1).to({rotation:-2.7852,x:-109.55,y:144.6,startPosition:63},0).wait(1).to({rotation:-3.2104,x:-109.35,y:145.6,startPosition:64},0).wait(1).to({rotation:-3.6356,x:-109.15,y:146.55,startPosition:65},0).wait(1).to({rotation:-4.0608,x:-108.9,y:147.5,startPosition:66},0).wait(1).to({rotation:-4.486,x:-108.65,y:148.4,startPosition:67},0).wait(1).to({rotation:-4.9113,x:-108.4,y:149.35,startPosition:68},0).wait(1).to({rotation:-5.3365,x:-108.2,y:150.3,startPosition:69},0).wait(1).to({rotation:-5.7617,x:-107.95,y:151.2,startPosition:70},0).wait(1).to({rotation:-6.1869,x:-107.65,y:152.1,startPosition:71},0).wait(1).to({rotation:-6.6121,x:-107.35,y:153.1,startPosition:72},0).wait(1).to({rotation:-7.0374,x:-107.1,y:154,startPosition:73},0).wait(1).to({rotation:-7.4626,x:-106.8,y:154.9,startPosition:74},0).wait(1).to({rotation:-7.8878,x:-106.55,y:155.8,startPosition:75},0).wait(1).to({rotation:-8.313,x:-106.2,y:156.75,startPosition:76},0).wait(1).to({rotation:-8.7382,x:-105.95,y:157.7,startPosition:77},0).wait(1).to({rotation:-9.1635,x:-105.6,y:158.6,startPosition:78},0).wait(1).to({rotation:-9.5887,x:-105.3,y:159.55,startPosition:79},0).wait(1).to({rotation:-10.0139,x:-105,y:160.4,startPosition:80},0).wait(1).to({rotation:-10.4391,x:-104.65,y:161.3,startPosition:81},0).wait(1).to({rotation:-10.8643,x:-104.3,y:162.25,startPosition:82},0).wait(1).to({rotation:-11.2896,x:-103.9,y:163.15,startPosition:83},0).wait(1).to({rotation:-11.7148,x:-103.65,y:164.05,startPosition:84},0).wait(1).to({rotation:-12.14,x:-103.25,y:165,startPosition:85},0).wait(1).to({rotation:-12.5652,x:-102.85,y:165.85,startPosition:86},0).wait(1).to({rotation:-12.9904,x:-102.55,y:166.75,startPosition:87},0).wait(1).to({rotation:-13.4157,x:-102.15,y:167.65,startPosition:88},0).wait(1).to({rotation:-13.8409,x:-101.75,y:168.5,startPosition:89},0).wait(1).to({rotation:-14.2661,x:-101.4,y:169.45,startPosition:90},0).wait(1).to({rotation:-14.6913,x:-100.95,y:170.3,startPosition:91},0).wait(1).to({rotation:-15.1165,x:-100.55,y:171.2,startPosition:92},0).wait(1).to({rotation:-15.5418,x:-100.15,y:172.05,startPosition:93},0).wait(1).to({rotation:-15.967,x:-99.75,y:172.9,startPosition:94},0).wait(1).to({rotation:-16.3922,x:-99.25,y:173.85,startPosition:95},0).wait(1).to({rotation:-16.8174,x:-98.85,y:174.65,startPosition:96},0).wait(1).to({rotation:-17.2426,x:-98.45,y:175.55,startPosition:97},0).wait(1).to({rotation:-17.6679,x:-97.95,y:176.45,startPosition:98},0).wait(1).to({rotation:-18.0931,x:-97.5,y:177.3,startPosition:99},0).wait(1).to({rotation:-18.5183,x:-97.1,y:178.1,startPosition:100},0).wait(1).to({rotation:-18.9435,x:-96.6,y:179,startPosition:101},0).wait(1).to({rotation:-19.3687,x:-96.15,y:179.8,startPosition:102},0).wait(1).to({rotation:-19.7939,x:-95.7,y:180.65,startPosition:103},0).wait(1).to({rotation:-20.2192,x:-95.2,y:181.55,startPosition:104},0).wait(1).to({rotation:-20.6444,x:-94.7,y:182.35,startPosition:105},0).wait(1).to({rotation:-21.0696,x:-94.2,y:183.15,startPosition:106},0).wait(1).to({rotation:-21.4948,x:-93.75,y:184,startPosition:107},0).wait(1).to({rotation:-21.92,x:-93.2,y:184.9,startPosition:108},0).wait(1).to({rotation:-22.3453,x:-92.65,y:185.65,startPosition:109},0).wait(1).to({rotation:-22.7705,x:-92.15,y:186.45,startPosition:110},0).wait(1).to({rotation:-23.1957,x:-91.65,y:187.3,startPosition:111},0).wait(1).to({rotation:-23.6209,x:-91.1,y:188.15,startPosition:112},0).wait(1).to({rotation:-24.0461,x:-90.6,y:188.9,startPosition:113},0).wait(1).to({rotation:-24.4714,x:-90.05,y:189.75,startPosition:114},0).wait(1).to({rotation:-24.8966,x:-89.5,y:190.55,startPosition:115},0).wait(1).to({rotation:-25.3218,x:-88.9,y:191.35,startPosition:116},0).wait(1).to({rotation:-25.747,x:-88.4,y:192.15,startPosition:117},0).wait(1).to({rotation:-26.1722,x:-87.85,y:192.9,startPosition:118},0).wait(1).to({rotation:-26.5975,x:-87.25,y:193.7,startPosition:119},0).wait(1).to({rotation:-27.0227,x:-86.65,y:194.5,startPosition:0},0).wait(1).to({rotation:-27.4479,x:-86.1,y:195.25,startPosition:1},0).to({_off:true},1).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-257.6,-232.3,549.9000000000001,737.4000000000001);


(lib.girlquiet = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// head
	this.instance = new lib.girlheadquiet();
	this.instance.setTransform(80,60.95,1,1,0,0,0,91.7,265.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:105.8,regY:135.9,rotation:0.1753,x:94.55,y:-68.8},0).wait(1).to({rotation:0.3506,x:94.9,y:-68.75},0).wait(1).to({rotation:0.5259,x:95.3,y:-68.7},0).wait(1).to({rotation:0.7012,x:95.75,y:-68.65},0).wait(1).to({rotation:0.8765,x:96.1,y:-68.6},0).wait(1).to({rotation:1.0518,x:96.5,y:-68.5},0).wait(1).to({rotation:1.2271,x:96.9,y:-68.55},0).wait(1).to({rotation:1.4024,x:97.3,y:-68.45},0).wait(1).to({rotation:1.5777,x:97.65,y:-68.4},0).wait(1).to({rotation:1.753,x:98.1,y:-68.3},0).wait(1).to({rotation:1.9283,x:98.5},0).wait(1).to({rotation:2.1036,x:98.9,y:-68.2},0).wait(1).to({rotation:2.2789,x:99.25,y:-68.15},0).wait(1).to({rotation:2.4541,x:99.7,y:-68.1},0).wait(1).to({rotation:2.6294,x:100,y:-68.05},0).wait(1).to({rotation:2.8047,x:100.4,y:-67.95},0).wait(1).to({rotation:2.98,x:100.8},0).wait(1).to({rotation:3.1553,x:101.2,y:-67.85},0).wait(1).to({rotation:3.3306,x:101.55,y:-67.8},0).wait(1).to({rotation:3.5059,x:102,y:-67.75},0).wait(1).to({rotation:3.6812,x:102.4,y:-67.65},0).wait(1).to({rotation:3.8565,x:102.75,y:-67.6},0).wait(1).to({rotation:4.0318,x:103.2,y:-67.5},0).wait(1).to({rotation:4.2071,x:103.55,y:-67.45},0).wait(1).to({rotation:4.3824,x:103.95,y:-67.35},0).wait(1).to({rotation:4.5577,x:104.35,y:-67.3},0).wait(1).to({rotation:4.733,x:104.75,y:-67.2},0).wait(1).to({rotation:4.9083,x:105.1,y:-67.15},0).wait(1).to({rotation:5.0836,x:105.55,y:-67.1},0).wait(1).to({rotation:5.2589,x:105.9,y:-66.95},0).wait(1).to({rotation:5.4342,x:106.3,y:-66.9},0).wait(1).to({rotation:5.6095,x:106.7,y:-66.8},0).wait(1).to({rotation:5.7848,x:107.05,y:-66.75},0).wait(1).to({rotation:5.9601,x:107.5,y:-66.65},0).wait(1).to({rotation:6.1354,x:107.9,y:-66.6},0).wait(1).to({rotation:6.3107,x:108.25,y:-66.5},0).wait(1).to({rotation:6.486,x:108.65,y:-66.4},0).wait(1).to({rotation:6.6613,x:109.05,y:-66.3},0).wait(1).to({rotation:6.8366,x:109.4,y:-66.2},0).wait(1).to({rotation:7.0119,x:109.8,y:-66.15},0).wait(1).to({rotation:7.1872,x:110.2,y:-66},0).wait(1).to({rotation:7.3624,x:110.65,y:-65.95},0).wait(1).to({rotation:7.5377,x:110.95,y:-65.85},0).wait(1).to({rotation:7.713,x:111.35,y:-65.75},0).wait(1).to({rotation:7.5524,x:111.05,y:-65.85},0).wait(1).to({rotation:7.3917,x:110.6,y:-65.95},0).wait(1).to({rotation:7.231,x:110.3,y:-66.05},0).wait(1).to({rotation:7.0703,x:109.95,y:-66.15},0).wait(1).to({rotation:6.9096,x:109.6},0).wait(1).to({rotation:6.7489,x:109.25,y:-66.25},0).wait(1).to({rotation:6.5882,x:108.85,y:-66.35},0).wait(1).to({rotation:6.4275,x:108.55,y:-66.4},0).wait(1).to({rotation:6.2668,x:108.15,y:-66.5},0).wait(1).to({rotation:6.1062,x:107.8,y:-66.55},0).wait(1).to({rotation:5.9455,x:107.45,y:-66.7},0).wait(1).to({rotation:5.7848,x:107.05,y:-66.75},0).wait(1).to({rotation:5.6241,x:106.75,y:-66.85},0).wait(1).to({rotation:5.4634,x:106.35,y:-66.9},0).wait(1).to({rotation:5.3027,x:106,y:-66.95},0).wait(1).to({rotation:5.142,x:105.6,y:-67},0).to({_off:true},1).wait(63));

	// dress
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC3399").s().p("AE9a1QgOgFgagRQgagQgPgFQgagLgogBQguABgXgBQgngCgdgPQghgQgKgeQg+AUhCgCQhBgBg9gWQg2gXgcgIQgMgEgrgIQgigHgUgJQgcgLgSgWQgUgYACgbQglAAgggXQgggXgNgjQhmAPhrgEQgqgCgbgFQglgIgbgSQgegVgMgiQgMgkAQgdQhAASgkAFQg5AIgsgLQg0gMgigpQgkgsAJgwQg7AMgfACQgyAFgngJQgvgKghggQgkgigDgrQgDgeAPgmIAehAIAWgqQANgXAPgNQAigcA/ACQBJAKAjACQBhAHBug1QBIgiBzhUQBAguAfgYQAzgoAmgkQBZhTBBhqQAyhPAghWIgCgGQgdhVgWieQgYiugUhHIgcheQgRg5gGgnQgJhBALheQAQhqAFg1IAHhjQAFg6AIgnQAJgsAbhJIBpkoQAOgoANgUIAKgPQAHgsAJgYQAPgsAfgTQAcgSAkAGQAkAGAUAaQARAWAGAiQADAWAAApIgDDnQgBA7ADAgQAFAyAQAlQAlBUBoA1QBOApBeALQBZALBbgRQCvgjCTh9QBYhKAWhKQAKgeACgpIABhJQABgTACgRIABgNQAIg5AYghQAWgfAkgLQAmgNAfASQAdARANAoQAJAdACAwQAHCrgEDXIgBAvQAFB7APB3IAKBXQAFAygBAmQgEBegxB7QgcBGg+CKQg4CMgWCOIgIA0QAPAWANAZQAUAnAeBQQAfBRATAlQA2BqBuBjQBGA+CPBkIDLCOQAxAjAYATQAnAhAWAhQAcAnAGAtQAIAwgUAnQgbA1hHAXQgyARhTAEQgYA8hFAUQhFAVg0gmQggANgfBAQggBAgfAPQgXALg2gDQg2gEgXAMQgQAIgUAXQgXAagKAHQgeAYg6ACQhCgBggAEQgiAFgvATIhPAiQg7AYguAAQgbAAgXgJg");
	this.shape.setTransform(63.2089,220.5418);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(60).to({_off:true},1).wait(63));

	// other_hand
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFC3C3").s().p("ALNY+QgQgIgXgRIgmgbQgQgKgZgLIgpgUIgqgXQgTgIgRgNIgPgJQg/gegdgSQgzgegXglQgVghgDgoQgCgoAQgkQAQgkAggZQANgKAPgHIhAklQgWhlgGgnQgViGALiJQAEg1AIg1Qg4hVhpi7Qhpi4hEhfIgrg7QgagjgQgaQgSgegVgqIgjhKQhHiHgphXQhyhbiBhRQg/gogagVQgvgngTgrQgag7AZhCQAZhCA6gcIhegXQg5gNgjgOQgxgTgjgeQgogigQgqQgSgvAQgwQARgzAsgSQAdgMApAFIBJAOQAfAGA0AFQA/AGATADQBLAMBYAgQA8AWBhArQBEAfAmAUQA5AeArAfQAqAfAuAuQAdAbA1A6QBwB4AyBBQBRBqBKCTQAxBgBKCvIAJAUIADAGQANAbATA1QA4CfAUBFQBLEAAXFDQARDsgIFkQgCBEgEAiQgGAwgOAmIACABIBmBMIBFAsQAlAcATAdQAdAvgKA8QgLA7grAkQgqAkg7AFIgRAAQgwAAgrgXg");
	this.shape_1.setTransform(194.0182,225.8336);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(60).to({_off:true},1).wait(63));

	// legs
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFC3C3").s().p("AEHUKQhOgHg5gtQgegWgUgfQgVgggIgjQgKgxAOg/QAJglAchIQAdhKASg7IAxigQAihZA0gxQA2gzBOgOQBOgOBFAdIAJAFQAagNASgIQAvgUDjhGQBhgeBIgiIhcgMQjeggiUhDQhCgehMgvQgugehYg7QhjhEgwglQgsgiglghIgSAeQg+BjhfA7QgyAdhdAkIgPAGQAqASAlANIArAPIAUgIQAxgRAwAGQAwAHApAeQApAgARAtQAPAogEA1QgCAlgOA6QgfCBgqCBQgVBAgQAgQgRAigaAlQgSAaghAoQgYAbgNANQgVAWgVANQgyAghBgFQhAgEgygkQgrgggSgrQgNghgCg7QgDiIAjh/IhZgLQlMgpicgXQkPgojWguQhqgXhBgVQhcgfhDgsQhshHg6h0QgZgxgLgyQgsg9gIhUQgJhjAshaQAohTBPhCQBHg8BfgnQBPghBqgXQA8gNCDgUIFpg3QBzgSA9gMIAngJQAcgPApgeIBCgxIBHgtQAqgbAXgZQAbgdAihCQAlhGAWgbQAhgnAvgXQAvgXAyABQAzABAuAZQAvAaAZAsQAgA3gDBWQgBAygPBlQA1AQAkAvQAkAwgBA3QAAAhgNAjIAKAAQAmACApAZQALAGANAKQgQg+AFhDQAHhoA2hVQArhCBAgiQBIgmBBAWQAUAGATANQADgWATgVQAYgZAngRQA7gYA8gEQBAgFA3AUQAkAMAnAaQAYAQAsAhIDzC6QBxBWA/AzQBgBNBKBEQA0AyA4A6QBHAaA0AiQBgBABIBwQBGBrAgCBQAeB+gkBSIgHAQQACATABAUQACBegsBQQgfA6g6A2QgrAohIAyQh+BXhaAlQhdAmiZAZQiJAXitANQhnAJjQALQhYAFguAAQgUAdgIAQQgMAXgJAiIgPA6QgSA+gbA6QgdA5gdAZQgeAbgsALQgcAHgfAAIgagBg");
	this.shape_2.setTransform(49.8473,375.967);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(60).to({_off:true},1).wait(63));

	// torso
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFC3C3").s().p("Ag+ZhQiwgXifhLQiUhFhfhsQhth7gGiMQgChDAYhcQAghnANg0QAkiHAAiOQAAiNgliHQgJgjgfhdQgahRgLgvQgYhpABh9QAAhlASiDQAKhLAMgzQAPhEAYg2QAcg9ApgvQAtgyA4gbQA6gbB1gLQBagIA0gMIABgDQAFgTAHgnQAUhsAJhKQALhkgDhUQgCg7ABgMQABgnALgdQAQgqAngbQAogbAtAAQAsABAnAbQAnAbAQAqIACAFQANAHAOALQAiAaANAcQAKAVABAcIAAAbQAIAqgCA5QgCBJACAaQAEA2ATAlQAgA9BYApQAyAYBpAqQBAAgAzAyQA0AyAiA/QAwBbAWCXQAYCqgYB5QgMA9geBPQgRAtgmBZQheDsgSDXQgUD6BXDGIAxBnQAfA+ANArQASA7gEA3QgEA9ggAsQgiAvg+ALQgfAFgagHQgYA7gvAoQgmAgg3AUQgsAQg9ALQhhAShjAAQhLAAhMgLg");
	this.shape_3.setTransform(79.0043,164.3613);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(60).to({_off:true},1).wait(63));

	// hand
	this.instance_1 = new lib.girlarmstopped("synched",0);
	this.instance_1.setTransform(0.5,98.75,1,1,-29.3927,0,0,235.8,62);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:97.4,regY:165.9,rotation:-29.0781,x:-69.75,y:256.7,startPosition:1},0).wait(1).to({rotation:-28.7631,x:-70.4,y:256.25,startPosition:2},0).wait(1).to({rotation:-28.4482,x:-71.05,y:255.7,startPosition:3},0).wait(1).to({rotation:-28.1333,x:-71.75,y:255.25,startPosition:4},0).wait(1).to({rotation:-27.8183,x:-72.45,y:254.8,startPosition:5},0).wait(1).to({rotation:-27.5034,x:-73.1,y:254.25,startPosition:6},0).wait(1).to({rotation:-27.1885,x:-73.7,y:253.75,startPosition:7},0).wait(1).to({rotation:-26.8735,x:-74.35,y:253.25,startPosition:8},0).wait(1).to({rotation:-26.5586,x:-75.1,y:252.75,startPosition:9},0).wait(1).to({rotation:-26.2437,x:-75.7,y:252.25,startPosition:10},0).wait(1).to({rotation:-25.9287,x:-76.3,y:251.7,startPosition:11},0).wait(1).to({rotation:-25.6138,x:-76.95,y:251.2,startPosition:12},0).wait(1).to({rotation:-25.2989,x:-77.6,y:250.7,startPosition:13},0).wait(1).to({rotation:-24.9839,x:-78.25,y:250.1,startPosition:14},0).wait(1).to({rotation:-24.669,x:-78.9,y:249.6,startPosition:15},0).wait(1).to({rotation:-24.354,x:-79.5,y:249.1,startPosition:16},0).wait(1).to({rotation:-24.0391,x:-80.15,y:248.5,startPosition:17},0).wait(1).to({rotation:-23.7242,x:-80.8,y:247.95,startPosition:18},0).wait(1).to({rotation:-23.4092,x:-81.4,y:247.4,startPosition:19},0).wait(1).to({rotation:-23.0943,x:-82.05,y:246.85,startPosition:20},0).wait(1).to({rotation:-22.7794,x:-82.65,y:246.3,startPosition:21},0).wait(1).to({rotation:-22.4644,x:-83.25,y:245.7,startPosition:22},0).wait(1).to({rotation:-22.1495,x:-83.9,y:245.15,startPosition:23},0).wait(1).to({rotation:-21.8346,x:-84.5,y:244.6,startPosition:24},0).wait(1).to({rotation:-21.5196,x:-85.1,y:243.95,startPosition:25},0).wait(1).to({rotation:-21.2047,x:-85.7,y:243.35,startPosition:26},0).wait(1).to({rotation:-20.8898,x:-86.3,y:242.8,startPosition:27},0).wait(1).to({rotation:-20.5748,x:-86.9,y:242.15,startPosition:28},0).wait(1).to({rotation:-20.2599,x:-87.55,y:241.6,startPosition:29},0).wait(1).to({rotation:-19.945,x:-88.1,y:241,startPosition:30},0).wait(1).to({rotation:-19.63,x:-88.7,y:240.4,startPosition:31},0).wait(1).to({rotation:-19.3151,x:-89.35,y:239.8,startPosition:32},0).wait(1).to({rotation:-19.0002,x:-89.9,y:239.15,startPosition:33},0).wait(1).to({rotation:-18.6852,x:-90.5,y:238.55,startPosition:34},0).wait(1).to({rotation:-18.3703,x:-91,y:237.9,startPosition:35},0).wait(1).to({rotation:-18.0554,x:-91.65,y:237.3,startPosition:36},0).wait(1).to({rotation:-17.7404,x:-92.2,y:236.6,startPosition:37},0).wait(1).to({rotation:-17.4255,x:-92.75,y:236.05,startPosition:38},0).wait(1).to({rotation:-17.1105,x:-93.35,y:235.35,startPosition:39},0).wait(1).to({rotation:-16.7956,x:-93.9,y:234.7,startPosition:40},0).wait(1).to({rotation:-16.4807,x:-94.5,y:234.05,startPosition:41},0).wait(1).to({rotation:-16.1657,x:-95.05,y:233.45,startPosition:42},0).wait(1).to({rotation:-15.8508,x:-95.6,y:232.75,startPosition:43},0).wait(1).to({rotation:-15.5359,x:-96.1,y:232.05,startPosition:44},0).wait(1).to({rotation:-15.2209,x:-96.7,y:231.45,startPosition:45},0).wait(1).to({rotation:-14.906,x:-97.3,y:230.7,startPosition:46},0).wait(1).to({rotation:-14.5911,x:-97.8,y:230.05,startPosition:47},0).wait(1).to({rotation:-14.2761,x:-98.35,y:229.4,startPosition:48},0).wait(1).to({rotation:-13.9612,x:-98.9,y:228.7,startPosition:49},0).wait(1).to({rotation:-13.6463,x:-99.4,y:227.95,startPosition:50},0).wait(1).to({rotation:-13.3313,x:-99.95,y:227.35,startPosition:51},0).wait(1).to({rotation:-13.0164,x:-100.5,y:226.6,startPosition:52},0).wait(1).to({startPosition:53},0).wait(1).to({startPosition:54},0).wait(1).to({startPosition:55},0).wait(1).to({startPosition:56},0).wait(1).to({startPosition:57},0).wait(1).to({startPosition:58},0).wait(1).to({startPosition:59},0).wait(1).to({startPosition:60},0).to({_off:true},1).wait(63));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-240.3,-232.1,532.6,737.2);


(lib.Scene_1_johnny = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// johnny
	this.instance = new lib.johnnytalking("synched",1);
	this.instance.setTransform(518.2,396.9,0.5928,0.5928,0,0,0,275.8,384.4);

	this.instance_1 = new lib.johnnyquiet("synched",52);
	this.instance_1.setTransform(518.2,396.9,0.5928,0.5928,0,0,0,275.8,384.4);

	this.instance_2 = new lib.johnnyear("synched",0);
	this.instance_2.setTransform(-363.35,351.15,1,1,0,0,0,347.5,458.2);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},122).to({state:[]},61).to({state:[{t:this.instance_2}]},191).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(375).to({_off:false},0).wait(1).to({regY:458,x:-344.4,y:350.95},0).wait(1).to({x:-325.85},0).wait(1).to({x:-307.6},0).wait(1).to({x:-289.65},0).wait(1).to({x:-272.05},0).wait(1).to({x:-254.8},0).wait(1).to({x:-237.85},0).wait(1).to({x:-221.25},0).wait(1).to({x:-205},0).wait(1).to({x:-189.05},0).wait(1).to({x:-173.4},0).wait(1).to({x:-158.1},0).wait(1).to({x:-143.15},0).wait(1).to({x:-128.5},0).wait(1).to({x:-114.2},0).wait(1).to({x:-100.25},0).wait(1).to({x:-86.6},0).wait(1).to({x:-73.25},0).wait(1).to({x:-60.3},0).wait(1).to({x:-47.6},0).wait(1).to({x:-35.3},0).wait(1).to({x:-23.25},0).wait(1).to({x:-11.6},0).wait(1).to({x:-0.25},0).wait(1).to({x:10.75},0).wait(1).to({x:21.45},0).wait(1).to({x:31.8},0).wait(1).to({x:41.85},0).wait(1).to({x:51.55},0).wait(1).to({x:60.9},0).wait(1).to({x:69.95},0).wait(1).to({x:78.65},0).wait(1).to({x:87.05},0).wait(1).to({x:95.1},0).wait(1).to({x:102.85},0).wait(1).to({x:110.25},0).wait(1).to({x:117.3},0).wait(1).to({x:124.05},0).wait(1).to({x:130.45},0).wait(1).to({x:136.55},0).wait(1).to({x:142.3},0).wait(1).to({x:147.75},0).wait(1).to({x:152.85},0).wait(1).to({x:157.6},0).wait(1).to({x:162.05},0).wait(1).to({x:166.15},0).wait(1).to({x:169.95},0).wait(1).to({x:173.4},0).wait(1).to({x:176.5},0).wait(1).to({x:179.3},0).wait(1).to({x:181.8},0).wait(1).to({x:183.9},0).wait(1).to({x:185.7},0).wait(1).to({x:187.2},0).wait(1).to({x:188.35},0).wait(1).to({x:189.2},0).wait(1).to({x:189.65},0).wait(1).to({x:189.85},0).wait(1).to({regY:458.2,x:199.35,y:351.15},0).wait(1).to({regY:458,y:350.95},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_girl = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// girl
	this.instance = new lib.girltalking("synched",1);
	this.instance.setTransform(815.45,388.5,0.6296,0.6296,0,0,0,24.9,129.8);

	this.instance_1 = new lib.girlquiet("synched",0,false);
	this.instance_1.setTransform(815.45,388.5,0.6296,0.6296,0,0,0,24.9,129.8);

	this.instance_2 = new lib.girlface("synched",0);
	this.instance_2.setTransform(642.05,369.9,1,1,0,0,0,205.3,267.1);

	this.instance_3 = new lib.girlprofilequiet("synched",0);
	this.instance_3.setTransform(1630.55,290.65,1,1,0,0,0,36,72.2);
	this.instance_3._off = true;

	this.instance_4 = new lib.girlprofiletalking("synched",0);
	this.instance_4.setTransform(1249.75,290.65,1,1,0,0,0,36,72.2);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},122).to({state:[]},61).to({state:[{t:this.instance_2}]},133).to({state:[{t:this.instance_3}]},58).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(375).to({_off:false},0).wait(1).to({regX:407.4,regY:38.7,x:1989.15,y:257.15},0).wait(1).to({x:1976.55},0).wait(1).to({x:1964.2},0).wait(1).to({x:1952.05},0).wait(1).to({x:1940.15},0).wait(1).to({x:1928.5},0).wait(1).to({x:1917},0).wait(1).to({x:1905.8},0).wait(1).to({x:1894.75},0).wait(1).to({x:1883.95},0).wait(1).to({x:1873.4},0).wait(1).to({x:1863.05},0).wait(1).to({x:1852.9},0).wait(1).to({x:1843},0).wait(1).to({x:1833.35},0).wait(1).to({x:1823.9},0).wait(1).to({x:1814.65},0).wait(1).to({x:1805.65},0).wait(1).to({x:1796.85},0).wait(1).to({x:1788.25},0).wait(1).to({x:1779.9},0).wait(1).to({x:1771.8},0).wait(1).to({x:1763.9},0).wait(1).to({x:1756.2},0).wait(1).to({x:1748.75},0).wait(1).to({x:1741.55},0).wait(1).to({x:1734.5},0).wait(1).to({x:1727.75},0).wait(1).to({x:1721.15},0).wait(1).to({x:1714.85},0).wait(1).to({x:1708.7},0).wait(1).to({x:1702.8},0).wait(1).to({x:1697.15},0).wait(1).to({x:1691.7},0).wait(1).to({x:1686.45},0).wait(1).to({x:1681.45},0).wait(1).to({x:1676.65},0).wait(1).to({x:1672.1},0).wait(1).to({x:1667.75},0).wait(1).to({x:1663.65},0).wait(1).to({x:1659.75},0).wait(1).to({x:1656.05},0).wait(1).to({x:1652.6},0).wait(1).to({x:1649.4},0).wait(1).to({x:1646.4},0).wait(1).to({x:1643.6},0).wait(1).to({x:1641.05},0).wait(1).to({x:1638.7},0).wait(1).to({x:1636.6},0).wait(1).to({x:1634.7},0).wait(1).to({x:1633.05},0).wait(1).to({x:1631.6},0).wait(1).to({x:1630.35},0).wait(1).to({x:1629.35},0).wait(1).to({x:1628.6},0).wait(1).to({x:1628},0).wait(1).to({x:1627.7},0).wait(1).to({x:1627.6},0).to({_off:true},1).wait(185));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(434).to({_off:false},0).wait(1).to({regX:461.1,regY:87.2,x:1674.85,y:305.65,startPosition:1},0).wait(1).to({startPosition:2},0).wait(1).to({startPosition:3},0).wait(1).to({startPosition:4},0).wait(1).to({startPosition:5},0).wait(1).to({startPosition:6},0).wait(1).to({startPosition:7},0).wait(1).to({startPosition:8},0).wait(1).to({startPosition:9},0).wait(1).to({startPosition:10},0).wait(1).to({startPosition:11},0).wait(1).to({startPosition:12},0).wait(1).to({startPosition:13},0).wait(1).to({startPosition:14},0).wait(1).to({startPosition:15},0).wait(1).to({startPosition:16},0).wait(1).to({startPosition:17},0).wait(1).to({startPosition:18},0).wait(1).to({startPosition:19},0).wait(1).to({startPosition:20},0).wait(1).to({startPosition:21},0).wait(1).to({startPosition:22},0).wait(1).to({startPosition:23},0).wait(1).to({startPosition:24},0).wait(1).to({startPosition:25},0).wait(1).to({startPosition:26},0).wait(1).to({startPosition:27},0).wait(1).to({startPosition:28},0).wait(1).to({startPosition:29},0).wait(1).to({startPosition:30},0).wait(1).to({startPosition:31},0).wait(1).to({startPosition:32},0).wait(1).to({startPosition:33},0).wait(1).to({startPosition:34},0).wait(1).to({startPosition:35},0).wait(1).to({startPosition:36},0).wait(1).to({startPosition:37},0).wait(1).to({startPosition:38},0).wait(1).to({startPosition:39},0).wait(1).to({startPosition:40},0).wait(1).to({startPosition:41},0).wait(1).to({startPosition:42},0).wait(1).to({startPosition:43},0).wait(1).to({startPosition:44},0).wait(1).to({startPosition:45},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:47},0).wait(1).to({startPosition:48},0).wait(1).to({startPosition:49},0).wait(1).to({startPosition:50},0).wait(1).to({startPosition:51},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:53},0).wait(1).to({startPosition:54},0).wait(1).to({startPosition:55},0).wait(1).to({startPosition:56},0).wait(1).to({startPosition:57},0).wait(1).to({startPosition:58},0).wait(1).to({startPosition:59},0).wait(1).to({startPosition:60},0).wait(1).to({startPosition:61},0).wait(1).to({startPosition:62},0).wait(1).to({startPosition:63},0).wait(1).to({startPosition:64},0).wait(1).to({startPosition:65},0).wait(1).to({startPosition:66},0).wait(1).to({startPosition:67},0).wait(1).to({startPosition:68},0).wait(1).to({startPosition:69},0).wait(1).to({startPosition:70},0).wait(1).to({startPosition:71},0).wait(1).to({startPosition:72},0).wait(1).to({startPosition:73},0).wait(1).to({startPosition:74},0).wait(1).to({startPosition:75},0).wait(1).to({startPosition:76},0).wait(1).to({startPosition:77},0).wait(1).to({startPosition:78},0).wait(1).to({startPosition:79},0).wait(1).to({startPosition:80},0).wait(1).to({startPosition:81},0).wait(1).to({startPosition:82},0).wait(1).to({startPosition:83},0).wait(1).to({startPosition:84},0).wait(1).to({startPosition:85},0).wait(1).to({startPosition:86},0).wait(1).to({startPosition:87},0).wait(1).to({startPosition:88},0).wait(1).to({startPosition:89},0).wait(1).to({startPosition:90},0).wait(1).to({startPosition:91},0).wait(1).to({startPosition:92},0).wait(1).to({startPosition:93},0).wait(1).to({startPosition:94},0).wait(1).to({startPosition:95},0).wait(1).to({startPosition:96},0).wait(1).to({startPosition:97},0).wait(1).to({startPosition:98},0).wait(1).to({startPosition:99},0).wait(1).to({startPosition:100},0).wait(1).to({startPosition:101},0).wait(1).to({startPosition:102},0).wait(1).to({startPosition:103},0).wait(1).to({startPosition:104},0).wait(1).to({startPosition:105},0).wait(1).to({startPosition:106},0).wait(1).to({startPosition:107},0).wait(1).to({startPosition:108},0).wait(1).to({startPosition:109},0).wait(1).to({startPosition:110},0).wait(1).to({startPosition:111},0).wait(1).to({startPosition:112},0).wait(1).to({startPosition:113},0).wait(1).to({startPosition:114},0).wait(1).to({startPosition:115},0).wait(1).to({startPosition:116},0).wait(1).to({startPosition:117},0).wait(1).to({startPosition:118},0).wait(1).to({startPosition:119},0).wait(1).to({startPosition:120},0).wait(1).to({startPosition:121},0).wait(1).to({startPosition:122},0).wait(1).to({startPosition:123},0).wait(1).to({startPosition:124},0).wait(1).to({startPosition:125},0).wait(1).to({startPosition:126},0).wait(1).to({startPosition:127},0).wait(1).to({startPosition:128},0).wait(1).to({startPosition:129},0).wait(1).to({startPosition:130},0).wait(1).to({startPosition:131},0).wait(1).to({startPosition:132},0).wait(1).to({startPosition:133},0).wait(1).to({startPosition:134},0).wait(1).to({startPosition:135},0).wait(1).to({startPosition:136},0).wait(1).to({startPosition:137},0).wait(1).to({startPosition:138},0).wait(1).to({startPosition:139},0).wait(1).to({startPosition:140},0).wait(1).to({startPosition:141},0).wait(1).to({startPosition:142},0).wait(1).to({startPosition:143},0).wait(1).to({startPosition:144},0).wait(1).to({startPosition:145},0).wait(1).to({startPosition:146},0).wait(1).to({startPosition:147},0).wait(1).to({startPosition:148},0).wait(1).to({startPosition:149},0).wait(1).to({startPosition:150},0).wait(1).to({startPosition:151},0).wait(1).to({startPosition:152},0).wait(1).to({startPosition:153},0).wait(1).to({startPosition:154},0).wait(1).to({startPosition:155},0).wait(1).to({startPosition:156},0).wait(1).to({startPosition:157},0).wait(1).to({startPosition:158},0).wait(1).to({startPosition:159},0).wait(1).to({startPosition:160},0).wait(1).to({startPosition:161},0).wait(1).to({startPosition:162},0).wait(1).to({startPosition:163},0).wait(1).to({startPosition:164},0).wait(1).to({startPosition:165},0).wait(1).to({startPosition:166},0).wait(1).to({startPosition:167},0).wait(1).to({startPosition:168},0).wait(1).to({startPosition:169},0).wait(1).to({startPosition:170},0).wait(1).to({startPosition:171},0).wait(1).to({startPosition:172},0).wait(1).to({startPosition:173},0).wait(1).to({startPosition:174},0).wait(1).to({startPosition:175},0).wait(1).to({startPosition:176},0).wait(1).to({startPosition:177},0).wait(1).to({startPosition:178},0).wait(1).to({startPosition:179},0).wait(1).to({startPosition:180},0).wait(1).to({startPosition:181},0).wait(1).to({startPosition:182},0).wait(1).to({startPosition:183},0).wait(1).to({startPosition:184},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.johnny = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,2,617,618];
	this.streamSoundSymbolsList[1] = [{id:"johnny_1",startFrame:1,endFrame:619,loop:1,offset:0}];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.start = this.buttons.start;
		var self=this;
		self.stop();
		
		self.start.addEventListener("click",startPlaying);
		
		function startPlaying()
		{
			self.gotoAndPlay(1);
		}
	}
	this.frame_1 = function() {
		var soundInstance = playSound("johnny_1",0);
		this.InsertIntoSoundStreamData(soundInstance,1,619,1);
	}
	this.frame_2 = function() {
		this.start = undefined;
	}
	this.frame_617 = function() {
		this.replay = this.buttons.replay;
		var self=this;
		self.stop();
		
		self.replay.addEventListener("click",playAgain);
		
		function playAgain()
		{
		self.gotoAndPlay(1);	
			}
	}
	this.frame_618 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(615).call(this.frame_617).wait(1).call(this.frame_618).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(672.7,394.6,0.9111,0.9111);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(1).to({x:672.6991,y:394.5991},0).wait(1).to({x:672.6962,y:394.596},0).wait(1).to({x:672.6912,y:394.5907},0).wait(1).to({scaleX:0.9112,scaleY:0.9112,x:672.6844,y:394.5836},0).wait(1).to({x:672.6757,y:394.5743},0).wait(1).to({scaleX:0.9113,scaleY:0.9113,x:672.6649,y:394.5629},0).wait(1).to({scaleX:0.9114,scaleY:0.9114,x:672.6522,y:394.5495},0).wait(1).to({scaleX:0.9115,scaleY:0.9115,x:672.6375,y:394.534},0).wait(1).to({scaleX:0.9116,scaleY:0.9116,x:672.6209,y:394.5164},0).wait(1).to({scaleX:0.9118,scaleY:0.9118,x:672.6023,y:394.4968},0).wait(1).to({scaleX:0.9119,scaleY:0.9119,x:672.5817,y:394.475},0).wait(1).to({scaleX:0.9121,scaleY:0.9121,x:672.5593,y:394.4514},0).wait(1).to({scaleX:0.9123,scaleY:0.9123,x:672.5348,y:394.4255},0).wait(1).to({scaleX:0.9125,scaleY:0.9125,x:672.5083,y:394.3975},0).wait(1).to({scaleX:0.9127,scaleY:0.9127,x:672.48,y:394.3676},0).wait(1).to({scaleX:0.9129,scaleY:0.9129,x:672.4497,y:394.3357},0).wait(1).to({scaleX:0.9131,scaleY:0.9131,x:672.4173,y:394.3015},0).wait(1).to({scaleX:0.9134,scaleY:0.9134,x:672.3831,y:394.2653},0).wait(1).to({scaleX:0.9136,scaleY:0.9136,x:672.347,y:394.2272},0).wait(1).to({scaleX:0.9139,scaleY:0.9139,x:672.3088,y:394.1869},0).wait(1).to({scaleX:0.9142,scaleY:0.9142,x:672.2687,y:394.1445},0).wait(1).to({scaleX:0.9145,scaleY:0.9145,x:672.2266,y:394.1001},0).wait(1).to({scaleX:0.9148,scaleY:0.9148,x:672.1826,y:394.0536},0).wait(1).to({scaleX:0.9152,scaleY:0.9152,x:672.1366,y:394.005},0).wait(1).to({scaleX:0.9155,scaleY:0.9155,x:672.0886,y:393.9543},0).wait(1).to({scaleX:0.9159,scaleY:0.9159,x:672.0389,y:393.9018},0).wait(1).to({scaleX:0.9163,scaleY:0.9163,x:671.9869,y:393.8469},0).wait(1).to({scaleX:0.9166,scaleY:0.9166,x:671.9331,y:393.79},0).wait(1).to({scaleX:0.9171,scaleY:0.9171,x:671.8774,y:393.7312},0).wait(1).to({scaleX:0.9175,scaleY:0.9175,x:671.8196,y:393.6702},0).wait(1).to({scaleX:0.9179,scaleY:0.9179,x:671.7599,y:393.6072},0).wait(1).to({scaleX:0.9184,scaleY:0.9184,x:671.6983,y:393.5422},0).wait(1).to({scaleX:0.9188,scaleY:0.9188,x:671.6348,y:393.475},0).wait(1).to({scaleX:0.9193,scaleY:0.9193,x:671.5693,y:393.4058},0).wait(1).to({scaleX:0.9198,scaleY:0.9198,x:671.5018,y:393.3346},0).wait(1).to({scaleX:0.9203,scaleY:0.9203,x:671.4323,y:393.2612},0).wait(1).to({scaleX:0.9208,scaleY:0.9208,x:671.3609,y:393.1858},0).wait(1).to({scaleX:0.9214,scaleY:0.9214,x:671.2875,y:393.1082},0).wait(1).to({scaleX:0.9219,scaleY:0.9219,x:671.2121,y:393.0286},0).wait(1).to({scaleX:0.9225,scaleY:0.9225,x:671.1348,y:392.947},0).wait(1).to({scaleX:0.923,scaleY:0.923,x:671.0556,y:392.8634},0).wait(1).to({scaleX:0.9236,scaleY:0.9236,x:670.9744,y:392.7775},0).wait(1).to({scaleX:0.9242,scaleY:0.9242,x:670.8913,y:392.6898},0).wait(1).to({scaleX:0.9249,scaleY:0.9249,x:670.8061,y:392.5998},0).wait(1).to({scaleX:0.9255,scaleY:0.9255,x:670.7191,y:392.5079},0).wait(1).to({scaleX:0.9262,scaleY:0.9262,x:670.6301,y:392.414},0).wait(1).to({scaleX:0.9268,scaleY:0.9268,x:670.539,y:392.3177},0).wait(1).to({scaleX:0.9275,scaleY:0.9275,x:670.4461,y:392.2196},0).wait(1).to({scaleX:0.9282,scaleY:0.9282,x:670.3512,y:392.1194},0).wait(1).to({scaleX:0.9289,scaleY:0.9289,x:670.2543,y:392.0171},0).wait(1).to({scaleX:0.9296,scaleY:0.9296,x:670.1555,y:391.9127},0).wait(1).to({scaleX:0.9303,scaleY:0.9303,x:670.0549,y:391.8065},0).wait(1).to({scaleX:0.9311,scaleY:0.9311,x:669.9521,y:391.698},0).wait(1).to({scaleX:0.9319,scaleY:0.9319,x:669.8474,y:391.5873},0).wait(1).to({scaleX:0.9326,scaleY:0.9326,x:669.7407,y:391.4747},0).wait(1).to({scaleX:0.9334,scaleY:0.9334,x:669.6322,y:391.3601},0).wait(1).to({scaleX:0.9342,scaleY:0.9342,x:669.5216,y:391.2432},0).wait(1).to({scaleX:0.9351,scaleY:0.9351,x:669.4091,y:391.1245},0).wait(1).to({scaleX:0.9359,scaleY:0.9359,x:669.2947,y:391.0037},0).wait(1).to({scaleX:0.9367,scaleY:0.9367,x:669.1782,y:390.8806},0).wait(1).to({scaleX:0.9376,scaleY:0.9376,x:669.0598,y:390.7556},0).wait(1).to({scaleX:0.9385,scaleY:0.9385,x:668.9395,y:390.6286},0).wait(1).to({scaleX:0.9394,scaleY:0.9394,x:668.8173,y:390.4994},0).wait(1).to({scaleX:0.9403,scaleY:0.9403,x:668.693,y:390.3682},0).wait(1).to({scaleX:0.9412,scaleY:0.9412,x:668.5668,y:390.2349},0).wait(1).to({scaleX:0.9421,scaleY:0.9421,x:668.4386,y:390.0995},0).wait(1).to({scaleX:0.9431,scaleY:0.9431,x:668.3085,y:389.9621},0).wait(1).to({scaleX:0.944,scaleY:0.944,x:668.1765,y:389.8227},0).wait(1).to({scaleX:0.945,scaleY:0.945,x:668.0424,y:389.6811},0).wait(1).to({scaleX:0.946,scaleY:0.946,x:667.9066,y:389.5376},0).wait(1).to({scaleX:0.947,scaleY:0.947,x:667.7685,y:389.3919},0).wait(1).to({scaleX:0.948,scaleY:0.948,x:667.6287,y:389.2442},0).wait(1).to({scaleX:0.9491,scaleY:0.9491,x:667.4867,y:389.0943},0).wait(1).to({scaleX:0.9501,scaleY:0.9501,x:667.343,y:388.9424},0).wait(1).to({scaleX:0.9512,scaleY:0.9512,x:667.1973,y:388.7885},0).wait(1).to({scaleX:0.9523,scaleY:0.9523,x:667.0496,y:388.6325},0).wait(1).to({scaleX:0.9534,scaleY:0.9534,x:666.8999,y:388.4745},0).wait(1).to({scaleX:0.9545,scaleY:0.9545,x:666.7483,y:388.3143},0).wait(1).to({scaleX:0.9556,scaleY:0.9556,x:666.5946,y:388.1521},0).wait(1).to({scaleX:0.9567,scaleY:0.9567,x:666.4391,y:387.9878},0).wait(1).to({scaleX:0.9579,scaleY:0.9579,x:666.2815,y:387.8214},0).wait(1).to({scaleX:0.959,scaleY:0.959,x:666.122,y:387.653},0).wait(1).to({scaleX:0.9602,scaleY:0.9602,x:665.9607,y:387.4826},0).wait(1).to({scaleX:0.9614,scaleY:0.9614,x:665.7973,y:387.31},0).wait(1).to({scaleX:0.9626,scaleY:0.9626,x:665.632,y:387.1355},0).wait(1).to({scaleX:0.9638,scaleY:0.9638,x:665.4646,y:386.9587},0).wait(1).to({scaleX:0.965,scaleY:0.965,x:665.2954,y:386.78},0).wait(1).to({scaleX:0.9663,scaleY:0.9663,x:665.1243,y:386.5993},0).wait(1).to({scaleX:0.9676,scaleY:0.9676,x:664.951,y:386.4163},0).wait(1).to({scaleX:0.9688,scaleY:0.9688,x:664.7759,y:386.2313},0).wait(1).to({scaleX:0.9701,scaleY:0.9701,x:664.5989,y:386.0444},0).wait(1).to({scaleX:0.9714,scaleY:0.9714,x:664.4198,y:385.8553},0).wait(1).to({scaleX:0.9728,scaleY:0.9728,x:664.2388,y:385.6641},0).wait(1).to({scaleX:0.9741,scaleY:0.9741,x:664.0559,y:385.4709},0).wait(1).to({scaleX:0.9754,scaleY:0.9754,x:663.8711,y:385.2758},0).wait(1).to({scaleX:0.9768,scaleY:0.9768,x:663.6842,y:385.0784},0).wait(1).to({scaleX:0.9782,scaleY:0.9782,x:663.4953,y:384.8789},0).wait(1).to({scaleX:0.9796,scaleY:0.9796,x:663.3047,y:384.6776},0).wait(1).to({scaleX:0.981,scaleY:0.981,x:663.1119,y:384.4739},0).wait(1).to({scaleX:0.9824,scaleY:0.9824,x:662.9173,y:384.2684},0).wait(1).to({scaleX:0.9838,scaleY:0.9838,x:662.7205,y:384.0606},0).wait(1).to({scaleX:0.9853,scaleY:0.9853,x:662.522,y:383.8509},0).wait(1).to({scaleX:0.9867,scaleY:0.9867,x:662.3215,y:383.6392},0).wait(1).to({scaleX:0.9882,scaleY:0.9882,x:662.119,y:383.4253},0).wait(1).to({scaleX:0.9897,scaleY:0.9897,x:661.9145,y:383.2094},0).wait(1).to({scaleX:0.9912,scaleY:0.9912,x:661.7081,y:382.9914},0).wait(1).to({scaleX:0.9927,scaleY:0.9927,x:661.4997,y:382.7713},0).wait(1).to({scaleX:0.9943,scaleY:0.9943,x:661.2894,y:382.5492},0).wait(1).to({scaleX:0.9958,scaleY:0.9958,x:661.077,y:382.3249},0).wait(1).to({scaleX:0.9974,scaleY:0.9974,x:660.8627,y:382.0986},0).wait(1).to({scaleX:0.9989,scaleY:0.9989,x:660.6467,y:381.8704},0).wait(1).to({scaleX:1.0005,scaleY:1.0005,x:660.4284,y:381.6399},0).wait(1).to({scaleX:1.0021,scaleY:1.0021,x:660.2084,y:381.4076},0).wait(1).to({scaleX:1.0038,scaleY:1.0038,x:659.9862,y:381.1729},0).wait(1).to({scaleX:1.0054,scaleY:1.0054,x:659.7623,y:380.9364},0).wait(1).to({scaleX:1.007,scaleY:1.007,x:659.5361,y:380.6976},0).wait(1).to({scaleX:1.0087,scaleY:1.0087,x:659.3082,y:380.4569},0).wait(1).to({scaleX:1.0104,scaleY:1.0104,x:659.0784,y:380.2142},0).wait(1).to({scaleX:1.0121,scaleY:1.0121,x:658.8465,y:379.9693},0).wait(1).to({scaleX:1.0138,scaleY:1.0138,x:658.6127,y:379.7224},0).wait(1).to({scaleX:1.0155,scaleY:1.0155,x:658.3769,y:379.4734},0).wait(1).to({scaleX:1.0172,scaleY:1.0172,x:658.1392,y:379.2223},0).wait(1).to({scaleX:1.019,scaleY:1.019,x:657.8995,y:378.9691},0).wait(1).to({scaleX:1.0207,scaleY:1.0207,x:657.658,y:378.7141},0).wait(1).to({scaleX:1.0225,scaleY:1.0225,x:657.4143,y:378.4567},0).wait(1).to({scaleX:1.0243,scaleY:1.0243,x:657.1687,y:378.1973},0).wait(1).to({scaleX:1.0261,scaleY:1.0261,x:656.9213,y:377.936},0).wait(1).to({scaleX:1.0279,scaleY:1.0279,x:656.6717,y:377.6725},0).wait(1).to({scaleX:1.0298,scaleY:1.0298,x:656.4204,y:377.407},0).wait(1).to({scaleX:1.0316,scaleY:1.0316,x:656.167,y:377.1395},0).wait(1).to({scaleX:1.0335,scaleY:1.0335,x:655.9117,y:376.8699},0).wait(1).to({scaleX:1.0354,scaleY:1.0354,x:655.6543,y:376.598},0).wait(1).to({scaleX:1.0372,scaleY:1.0372,x:655.3951,y:376.3242},0).wait(1).to({scaleX:1.0391,scaleY:1.0391,x:655.1339,y:376.0484},0).wait(1).to({scaleX:1.0411,scaleY:1.0411,x:654.8707,y:375.7704},0).wait(1).to({scaleX:1.043,scaleY:1.043,x:654.6056,y:375.4904},0).wait(1).to({scaleX:1.0449,scaleY:1.0449,x:654.3386,y:375.2085},0).wait(1).to({scaleX:1.0469,scaleY:1.0469,x:654.0696,y:374.9243},0).wait(1).to({scaleX:1.0489,scaleY:1.0489,x:653.7985,y:374.6381},0).wait(1).to({scaleX:1.0509,scaleY:1.0509,x:653.5257,y:374.3499},0).wait(1).to({scaleX:1.0529,scaleY:1.0529,x:653.2507,y:374.0595},0).wait(1).to({scaleX:1.0549,scaleY:1.0549,x:652.9739,y:373.7672},0).wait(1).to({scaleX:1.0569,scaleY:1.0569,x:652.695,y:373.4726},0).wait(1).to({scaleX:1.059,scaleY:1.059,x:652.4143,y:373.1762},0).wait(1).to({scaleX:1.061,scaleY:1.061,x:652.1316,y:372.8776},0).wait(1).to({scaleX:1.0631,scaleY:1.0631,x:651.8469,y:372.577},0).wait(1).to({scaleX:1.0652,scaleY:1.0652,x:651.5603,y:372.2743},0).wait(1).to({scaleX:1.0673,scaleY:1.0673,x:651.2717,y:371.9695},0).wait(1).to({scaleX:1.0694,scaleY:1.0694,x:650.9812,y:371.6627},0).wait(1).to({scaleX:1.0716,scaleY:1.0716,x:650.6886,y:371.3537},0).wait(1).to({scaleX:1.0737,scaleY:1.0737,x:650.3941,y:371.0427},0).wait(1).to({scaleX:1.0759,scaleY:1.0759,x:650.0977,y:370.7296},0).wait(1).to({scaleX:1.078,scaleY:1.078,x:649.7992,y:370.4144},0).wait(1).to({scaleX:1.0802,scaleY:1.0802,x:649.499,y:370.0973},0).wait(1).to({scaleX:1.0824,scaleY:1.0824,x:649.1966,y:369.778},0).wait(1).to({scaleX:1.0847,scaleY:1.0847,x:648.8925,y:369.4568},0).wait(1).to({scaleX:1.0869,scaleY:1.0869,x:648.5863,y:369.1335},0).wait(1).to({scaleX:1.0891,scaleY:1.0891,x:648.278,y:368.8079},0).wait(1).to({scaleX:1.0914,scaleY:1.0914,x:647.968,y:368.4804},0).wait(1).to({scaleX:1.0937,scaleY:1.0937,x:647.6559,y:368.1509},0).wait(1).to({scaleX:1.096,scaleY:1.096,x:647.3419,y:367.8192},0).wait(1).to({scaleX:1.0983,scaleY:1.0983,x:647.0259,y:367.4855},0).wait(1).to({scaleX:1.1006,scaleY:1.1006,x:646.708,y:367.1497},0).wait(1).to({scaleX:1.1029,scaleY:1.1029,x:646.388,y:366.8119},0).wait(1).to({scaleX:1.1053,scaleY:1.1053,x:646.0662,y:366.4719},0).wait(1).to({scaleX:1.1076,scaleY:1.1076,x:645.7423,y:366.1299},0).wait(1).to({scaleX:1.11,scaleY:1.11,x:645.4166,y:365.786},0).wait(1).to({scaleX:1.1124,scaleY:1.1124,x:645.0888,y:365.4398},0).wait(1).to({scaleX:1.1148,scaleY:1.1148,x:644.7591,y:365.0915},0).wait(1).to({scaleX:1.1172,scaleY:1.1172,x:644.4275,y:364.7413},0).wait(1).to({scaleX:1.1196,scaleY:1.1196,x:644.094,y:364.3891},0).wait(1).to({scaleX:1.1221,scaleY:1.1221,x:643.7583,y:364.0346},0).wait(1).to({scaleX:1.1246,scaleY:1.1246,x:643.4209,y:363.6782},0).wait(1).to({scaleX:1.127,scaleY:1.127,x:643.0814,y:363.3197},0).wait(1).to({scaleX:1.1295,scaleY:1.1295,x:642.74,y:362.9592},0).wait(1).to({scaleX:1.132,scaleY:1.132,x:642.3966,y:362.5965},0).wait(1).to({scaleX:1.1345,scaleY:1.1345,x:642.0513,y:362.2318},0).wait(1).to({scaleX:1.1371,scaleY:1.1371,x:641.704,y:361.865},0).wait(1).to({scaleX:1.1396,scaleY:1.1396,x:641.3547,y:361.4961},0).wait(1).to({scaleX:1.1422,scaleY:1.1422,x:641.0035,y:361.1252},0).wait(1).to({scaleX:1.1448,scaleY:1.1448,x:640.6504,y:360.7523},0).wait(1).to({scaleX:1.1473,scaleY:1.1473,x:640.2952,y:360.3772},0).wait(1).to({scaleX:1.15,scaleY:1.15,x:639.9381,y:360},0).wait(1).to({regX:0.1,regY:0.1,scaleX:1,scaleY:1,x:377.9,y:388.05},0).wait(1).to({regX:0,regY:0,scaleX:1.0037,scaleY:1.0037,x:382.0862,y:387.7355},0).wait(1).to({scaleX:1.0073,scaleY:1.0073,x:386.3401,y:387.5227},0).wait(1).to({scaleX:1.011,scaleY:1.011,x:390.5618,y:387.3114},0).wait(1).to({scaleX:1.0146,scaleY:1.0146,x:394.7512,y:387.1018},0).wait(1).to({scaleX:1.0182,scaleY:1.0182,x:398.9083,y:386.8938},0).wait(1).to({scaleX:1.0217,scaleY:1.0217,x:403.0331,y:386.6874},0).wait(1).to({scaleX:1.0252,scaleY:1.0252,x:407.1235,y:386.4827},0).wait(1).to({scaleX:1.0287,scaleY:1.0287,x:411.1838,y:386.2795},0).wait(1).to({scaleX:1.0322,scaleY:1.0322,x:415.2096,y:386.0781},0).wait(1).to({scaleX:1.0356,scaleY:1.0356,x:419.2032,y:385.8782},0).wait(1).to({scaleX:1.039,scaleY:1.039,x:423.1645,y:385.68},0).wait(1).to({scaleX:1.0424,scaleY:1.0424,x:427.0935,y:385.4834},0).wait(1).to({scaleX:1.0458,scaleY:1.0458,x:430.9881,y:385.2885},0).wait(1).to({scaleX:1.0491,scaleY:1.0491,x:434.8526,y:385.0952},0).wait(1).to({scaleX:1.0524,scaleY:1.0524,x:438.6826,y:384.9035},0).wait(1).to({scaleX:1.0556,scaleY:1.0556,x:442.4804,y:384.7135},0).wait(1).to({scaleX:1.0589,scaleY:1.0589,x:446.2459,y:384.5251},0).wait(1).to({scaleX:1.0621,scaleY:1.0621,x:449.9791,y:384.3383},0).wait(1).to({scaleX:1.0653,scaleY:1.0653,x:453.68,y:384.1531},0).wait(1).to({scaleX:1.0684,scaleY:1.0684,x:457.3465,y:383.9696},0).wait(1).to({scaleX:1.0716,scaleY:1.0716,x:460.9829,y:383.7877},0).wait(1).to({scaleX:1.0747,scaleY:1.0747,x:464.5849,y:383.6074},0).wait(1).to({scaleX:1.0777,scaleY:1.0777,x:468.1546,y:383.4288},0).wait(1).to({scaleX:1.0808,scaleY:1.0808,x:471.692,y:383.2518},0).wait(1).to({scaleX:1.0838,scaleY:1.0838,x:475.1971,y:383.0764},0).wait(1).to({scaleX:1.0868,scaleY:1.0868,x:478.6678,y:382.9027},0).wait(1).to({scaleX:1.0897,scaleY:1.0897,x:482.1084,y:382.7306},0).wait(1).to({scaleX:1.0927,scaleY:1.0927,x:485.5145,y:382.5601},0).wait(1).to({scaleX:1.0956,scaleY:1.0956,x:488.8884,y:382.3913},0).wait(1).to({scaleX:1.0984,scaleY:1.0984,x:492.23,y:382.2241},0).wait(1).to({scaleX:1.1013,scaleY:1.1013,x:495.5394,y:382.0585},0).wait(1).to({scaleX:1.1041,scaleY:1.1041,x:498.8164,y:381.8945},0).wait(1).to({scaleX:1.1069,scaleY:1.1069,x:502.0612,y:381.7322},0).wait(1).to({scaleX:1.1097,scaleY:1.1097,x:505.2715,y:381.5715},0).wait(1).to({scaleX:1.1124,scaleY:1.1124,x:508.4496,y:381.4125},0).wait(1).to({scaleX:1.1151,scaleY:1.1151,x:511.5954,y:381.2551},0).wait(1).to({scaleX:1.1178,scaleY:1.1178,x:514.7089,y:381.0993},0).wait(1).to({scaleX:1.1204,scaleY:1.1204,x:517.7902,y:380.9451},0).wait(1).to({scaleX:1.123,scaleY:1.123,x:520.8391,y:380.7925},0).wait(1).to({scaleX:1.1256,scaleY:1.1256,x:523.8537,y:380.6417},0).wait(1).to({scaleX:1.1282,scaleY:1.1282,x:526.8381,y:380.4924},0).wait(1).to({scaleX:1.1307,scaleY:1.1307,x:529.7881,y:380.3447},0).wait(1).to({scaleX:1.1333,scaleY:1.1333,x:532.7058,y:380.1987},0).wait(1).to({scaleX:1.1357,scaleY:1.1357,x:535.5913,y:380.0544},0).wait(1).to({scaleX:1.1382,scaleY:1.1382,x:538.4444,y:379.9116},0).wait(1).to({scaleX:1.1406,scaleY:1.1406,x:541.2632,y:379.7705},0).wait(1).to({scaleX:1.143,scaleY:1.143,x:544.0518,y:379.631},0).wait(1).to({scaleX:1.1454,scaleY:1.1454,x:546.806,y:379.4932},0).wait(1).to({scaleX:1.1477,scaleY:1.1477,x:549.5279,y:379.357},0).wait(1).to({scaleX:1.15,scaleY:1.15,x:552.2175,y:379.2224},0).wait(1).to({scaleX:1.1523,scaleY:1.1523,x:554.8749,y:379.0894},0).wait(1).to({scaleX:1.1546,scaleY:1.1546,x:557.5,y:378.9581},0).wait(1).to({scaleX:1.1568,scaleY:1.1568,x:560.0906,y:378.8284},0).wait(1).to({scaleX:1.159,scaleY:1.159,x:562.6512,y:378.7003},0).wait(1).to({scaleX:1.1612,scaleY:1.1612,x:565.1773,y:378.5739},0).wait(1).to({scaleX:1.1633,scaleY:1.1633,x:567.6711,y:378.4491},0).wait(1).to({scaleX:1.1654,scaleY:1.1654,x:570.1326,y:378.326},0).wait(1).to({scaleX:1.1675,scaleY:1.1675,x:572.5619,y:378.2044},0).wait(1).to({scaleX:1.1696,scaleY:1.1696,x:574.9568,y:378.0846},0).wait(1).to({scaleX:1.1716,scaleY:1.1716,x:577.3215,y:377.9662},0).wait(1).to({scaleX:1.1736,scaleY:1.1736,x:579.6518,y:377.8496},0).wait(1).to({scaleX:1.1756,scaleY:1.1756,x:581.9498,y:377.7346},0).wait(1).to({scaleX:1.1776,scaleY:1.1776,x:584.2156,y:377.6213},0).wait(1).to({scaleX:1.1795,scaleY:1.1795,x:586.4491,y:377.5095},0).wait(1).to({scaleX:1.1814,scaleY:1.1814,x:588.6503,y:377.3994},0).wait(1).to({scaleX:1.1832,scaleY:1.1832,x:590.8192,y:377.2908},0).wait(1).to({scaleX:1.1851,scaleY:1.1851,x:592.9537,y:377.184},0).wait(1).to({scaleX:1.1869,scaleY:1.1869,x:595.0559,y:377.0788},0).wait(1).to({scaleX:1.1887,scaleY:1.1887,x:597.1258,y:376.9753},0).wait(1).to({scaleX:1.1904,scaleY:1.1904,x:599.1635,y:376.8733},0).wait(1).to({scaleX:1.1921,scaleY:1.1921,x:601.1689,y:376.773},0).wait(1).to({scaleX:1.1938,scaleY:1.1938,x:603.142,y:376.6742},0).wait(1).to({scaleX:1.1955,scaleY:1.1955,x:605.0807,y:376.5772},0).wait(1).to({scaleX:1.1971,scaleY:1.1971,x:606.9893,y:376.4817},0).wait(1).to({scaleX:1.1988,scaleY:1.1988,x:608.8634,y:376.3879},0).wait(1).to({scaleX:1.2003,scaleY:1.2003,x:610.7053,y:376.2958},0).wait(1).to({scaleX:1.2019,scaleY:1.2019,x:612.5149,y:376.2052},0).wait(1).to({scaleX:1.2034,scaleY:1.2034,x:614.2922,y:376.1163},0).wait(1).to({scaleX:1.2049,scaleY:1.2049,x:616.0351,y:376.0291},0).wait(1).to({scaleX:1.2064,scaleY:1.2064,x:617.7478,y:375.9434},0).wait(1).to({scaleX:1.2078,scaleY:1.2078,x:619.4261,y:375.8594},0).wait(1).to({scaleX:1.2093,scaleY:1.2093,x:621.0722,y:375.777},0).wait(1).to({scaleX:1.2107,scaleY:1.2107,x:622.686,y:375.6963},0).wait(1).to({scaleX:1.212,scaleY:1.212,x:624.2675,y:375.6171},0).wait(1).to({scaleX:1.2133,scaleY:1.2133,x:625.8167,y:375.5396},0).wait(1).to({scaleX:1.2146,scaleY:1.2146,x:627.3315,y:375.4638},0).wait(1).to({scaleX:1.2159,scaleY:1.2159,x:628.8162,y:375.3895},0).wait(1).to({scaleX:1.2172,scaleY:1.2172,x:630.2665,y:375.317},0).wait(1).to({scaleX:1.2184,scaleY:1.2184,x:631.6844,y:375.246},0).wait(1).to({scaleX:1.2196,scaleY:1.2196,x:633.0701,y:375.1767},0).wait(1).to({scaleX:1.2207,scaleY:1.2207,x:634.4236,y:375.1089},0).wait(1).to({scaleX:1.2219,scaleY:1.2219,x:635.7426,y:375.0429},0).wait(1).to({scaleX:1.223,scaleY:1.223,x:637.0314,y:374.9784},0).wait(1).to({scaleX:1.2241,scaleY:1.2241,x:638.2859,y:374.9157},0).wait(1).to({scaleX:1.2251,scaleY:1.2251,x:639.508,y:374.8545},0).wait(1).to({scaleX:1.2261,scaleY:1.2261,x:640.6979,y:374.795},0).wait(1).to({scaleX:1.2271,scaleY:1.2271,x:641.8556,y:374.7371},0).wait(1).to({scaleX:1.2281,scaleY:1.2281,x:642.9809,y:374.6807},0).wait(1).to({scaleX:1.2291,scaleY:1.2291,x:644.074,y:374.626},0).wait(1).to({scaleX:1.23,scaleY:1.23,x:645.1326,y:374.5731},0).wait(1).to({scaleX:1.2308,scaleY:1.2308,x:646.159,y:374.5217},0).wait(1).to({scaleX:1.2317,scaleY:1.2317,x:647.1531,y:374.472},0).wait(1).to({scaleX:1.2325,scaleY:1.2325,x:648.1149,y:374.4238},0).wait(1).to({scaleX:1.2333,scaleY:1.2333,x:649.0444,y:374.3773},0).wait(1).to({scaleX:1.2341,scaleY:1.2341,x:649.9417,y:374.3324},0).wait(1).to({scaleX:1.2348,scaleY:1.2348,x:650.8045,y:374.2893},0).wait(1).to({scaleX:1.2356,scaleY:1.2356,x:651.6372,y:374.2476},0).wait(1).to({scaleX:1.2362,scaleY:1.2362,x:652.4355,y:374.2076},0).wait(1).to({scaleX:1.2369,scaleY:1.2369,x:653.2015,y:374.1693},0).wait(1).to({scaleX:1.2375,scaleY:1.2375,x:653.9353,y:374.1326},0).wait(1).to({scaleX:1.2381,scaleY:1.2381,x:654.6367,y:374.0975},0).wait(1).to({scaleX:1.2387,scaleY:1.2387,x:655.3037,y:374.0641},0).wait(1).to({scaleX:1.2393,scaleY:1.2393,x:655.9406,y:374.0323},0).wait(1).to({scaleX:1.2398,scaleY:1.2398,x:656.5431,y:374.0021},0).wait(1).to({scaleX:1.2403,scaleY:1.2403,x:657.1133,y:373.9736},0).wait(1).to({scaleX:1.2407,scaleY:1.2407,x:657.6513,y:373.9467},0).wait(1).to({scaleX:1.2412,scaleY:1.2412,x:658.1569,y:373.9214},0).wait(1).to({scaleX:1.2416,scaleY:1.2416,x:658.6303,y:373.8977},0).wait(1).to({scaleX:1.2419,scaleY:1.2419,x:659.0692,y:373.8757},0).wait(1).to({scaleX:1.2423,scaleY:1.2423,x:659.4781,y:373.8553},0).wait(1).to({scaleX:1.2426,scaleY:1.2426,x:659.8525,y:373.8365},0).wait(1).to({scaleX:1.2429,scaleY:1.2429,x:660.1946,y:373.8194},0).wait(1).to({scaleX:1.2432,scaleY:1.2432,x:660.5044,y:373.8039},0).wait(1).to({scaleX:1.2434,scaleY:1.2434,x:660.782,y:373.79},0).wait(1).to({scaleX:1.2436,scaleY:1.2436,x:661.0251,y:373.7778},0).wait(1).to({scaleX:1.2438,scaleY:1.2438,x:661.2382,y:373.7672},0).wait(1).to({scaleX:1.244,scaleY:1.244,x:661.4167,y:373.7582},0).wait(1).to({scaleX:1.2441,scaleY:1.2441,x:661.5631,y:373.7509},0).wait(1).to({scaleX:1.2442,scaleY:1.2442,x:661.6771,y:373.7452},0).wait(1).to({scaleX:1.2443,scaleY:1.2443,x:661.7589,y:373.7411},0).wait(1).to({x:661.8084,y:373.7386},0).wait(1).to({x:661.8256,y:373.7378},0).wait(1).to({regX:0.1,scaleX:1.0123,scaleY:1.0123,x:639.55,y:359.55},0).wait(1).to({regX:0,scaleX:1.0016,scaleY:1.0016,x:639.1677,y:359.0423},0).wait(1).to({scaleX:0.991,scaleY:0.991,x:638.8904,y:358.5436},0).wait(1).to({scaleX:0.9806,scaleY:0.9806,x:638.6179,y:358.0536},0).wait(1).to({scaleX:0.9704,scaleY:0.9704,x:638.3505,y:357.5729},0).wait(1).to({scaleX:0.9604,scaleY:0.9604,x:638.0881,y:357.101},0).wait(1).to({scaleX:0.9506,scaleY:0.9506,x:637.8307,y:356.6382},0).wait(1).to({scaleX:0.941,scaleY:0.941,x:637.5783,y:356.1843},0).wait(1).to({scaleX:0.9316,scaleY:0.9316,x:637.3309,y:355.7394},0).wait(1).to({scaleX:0.9224,scaleY:0.9224,x:637.0886,y:355.3037},0).wait(1).to({scaleX:0.9133,scaleY:0.9133,x:636.8512,y:354.8767},0).wait(1).to({scaleX:0.9045,scaleY:0.9045,x:636.6187,y:354.4587},0).wait(1).to({scaleX:0.8958,scaleY:0.8958,x:636.3914,y:354.0499},0).wait(1).to({scaleX:0.8873,scaleY:0.8873,x:636.1689,y:353.6498},0).wait(1).to({scaleX:0.879,scaleY:0.879,x:635.9515,y:353.2589},0).wait(1).to({scaleX:0.871,scaleY:0.871,x:635.7392,y:352.877},0).wait(1).to({scaleX:0.8631,scaleY:0.8631,x:635.5318,y:352.5041},0).wait(1).to({scaleX:0.8553,scaleY:0.8553,x:635.3294,y:352.1401},0).wait(1).to({scaleX:0.8478,scaleY:0.8478,x:635.1319,y:351.7851},0).wait(1).to({scaleX:0.8405,scaleY:0.8405,x:634.9395,y:351.4391},0).wait(1).to({scaleX:0.8334,scaleY:0.8334,x:634.7521,y:351.102},0).wait(1).to({scaleX:0.8264,scaleY:0.8264,x:634.5696,y:350.7739},0).wait(1).to({scaleX:0.8196,scaleY:0.8196,x:634.3922,y:350.455},0).wait(1).to({scaleX:0.8131,scaleY:0.8131,x:634.2198,y:350.1448},0).wait(1).to({scaleX:0.8067,scaleY:0.8067,x:634.0524,y:349.8438},0).wait(1).to({scaleX:0.8005,scaleY:0.8005,x:633.8899,y:349.5516},0).wait(1).to({scaleX:0.7945,scaleY:0.7945,x:633.7325,y:349.2685},0).wait(1).to({scaleX:0.7887,scaleY:0.7887,x:633.5801,y:348.9945},0).wait(1).to({scaleX:0.7831,scaleY:0.7831,x:633.4326,y:348.7294},0).wait(1).to({scaleX:0.7777,scaleY:0.7777,x:633.2902,y:348.4732},0).wait(1).to({scaleX:0.7724,scaleY:0.7724,x:633.1527,y:348.226},0).wait(1).to({scaleX:0.7674,scaleY:0.7674,x:633.0203,y:347.9878},0).wait(1).to({scaleX:0.7625,scaleY:0.7625,x:632.8928,y:347.7586},0).wait(1).to({scaleX:0.7579,scaleY:0.7579,x:632.7704,y:347.5386},0).wait(1).to({scaleX:0.7534,scaleY:0.7534,x:632.6529,y:347.3272},0).wait(1).to({scaleX:0.7491,scaleY:0.7491,x:632.5405,y:347.1251},0).wait(1).to({scaleX:0.745,scaleY:0.745,x:632.433,y:346.9318},0).wait(1).to({scaleX:0.7411,scaleY:0.7411,x:632.3306,y:346.7476},0).wait(1).to({scaleX:0.7374,scaleY:0.7374,x:632.2331,y:346.5724},0).wait(1).to({scaleX:0.7339,scaleY:0.7339,x:632.1407,y:346.4062},0).wait(1).to({scaleX:0.7305,scaleY:0.7305,x:632.0532,y:346.2489},0).wait(1).to({scaleX:0.7274,scaleY:0.7274,x:631.9708,y:346.1006},0).wait(1).to({scaleX:0.7244,scaleY:0.7244,x:631.8933,y:345.9612},0).wait(1).to({scaleX:0.7217,scaleY:0.7217,x:631.8208,y:345.8309},0).wait(1).to({scaleX:0.7191,scaleY:0.7191,x:631.7533,y:345.7095},0).wait(1).to({scaleX:0.7167,scaleY:0.7167,x:631.6909,y:345.5973},0).wait(1).to({scaleX:0.7145,scaleY:0.7145,x:631.6333,y:345.4938},0).wait(1).to({scaleX:0.7125,scaleY:0.7125,x:631.5809,y:345.3995},0).wait(1).to({scaleX:0.7107,scaleY:0.7107,x:631.5335,y:345.3142},0).wait(1).to({scaleX:0.7091,scaleY:0.7091,x:631.4909,y:345.2376},0).wait(1).to({scaleX:0.7077,scaleY:0.7077,x:631.4534,y:345.1703},0).wait(1).to({scaleX:0.7064,scaleY:0.7064,x:631.421,y:345.1119},0).wait(1).to({scaleX:0.7054,scaleY:0.7054,x:631.3935,y:345.0624},0).wait(1).to({scaleX:0.7045,scaleY:0.7045,x:631.371,y:345.022},0).wait(1).to({scaleX:0.7039,scaleY:0.7039,x:631.3534,y:344.9905},0).wait(1).to({scaleX:0.7034,scaleY:0.7034,x:631.341,y:344.9682},0).wait(1).to({scaleX:0.7031,scaleY:0.7031,x:631.3335,y:344.9546},0).wait(1).to({scaleX:0.703,scaleY:0.703,x:631.3309,y:344.95},0).wait(1).to({scaleX:0.9846,scaleY:0.9846,x:627.3,y:337.6},0).wait(244));

	// buttons_obj_
	this.buttons = new lib.Scene_1_buttons();
	this.buttons.name = "buttons";
	this.buttons.setTransform(700.2,348.8,1.0976,1.0976,0,0,0,727.5,384.4);
	this.buttons.depth = 0;
	this.buttons.isAttachedToCamera = 0
	this.buttons.isAttachedToMask = 0
	this.buttons.layerDepth = 0
	this.buttons.layerIndex = 0
	this.buttons.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.buttons).wait(2).to({regY:384.5,y:348.9},0).wait(615).to({regX:686.6,regY:326.8,scaleX:1.0156,scaleY:1.0156,x:700.15},0).wait(2));

	// speach_bubble3_obj_
	this.speach_bubble3 = new lib.Scene_1_speach_bubble3();
	this.speach_bubble3.name = "speach_bubble3";
	this.speach_bubble3.setTransform(-0.05,0,1.0976,1.0976,0,0,0,89.5,66.6);
	this.speach_bubble3.depth = 0;
	this.speach_bubble3.isAttachedToCamera = 0
	this.speach_bubble3.isAttachedToMask = 0
	this.speach_bubble3.layerDepth = 0
	this.speach_bubble3.layerIndex = 1
	this.speach_bubble3.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.speach_bubble3).wait(1).to({x:0},0).wait(498).to({regX:-2.8,regY:-16.8,scaleX:1.0156,scaleY:1.0156,x:-0.05,y:-0.05},0).wait(1).to({regX:628.3,regY:262.6,scaleX:1,scaleY:1,x:631.05,y:279.3},0).wait(117).to({_off:true},1).wait(1));

	// speach_bubble2_obj_
	this.speach_bubble2 = new lib.Scene_1_speach_bubble2();
	this.speach_bubble2.name = "speach_bubble2";
	this.speach_bubble2.setTransform(-0.05,0,1.0976,1.0976,0,0,0,89.5,66.6);
	this.speach_bubble2.depth = 0;
	this.speach_bubble2.isAttachedToCamera = 0
	this.speach_bubble2.isAttachedToMask = 0
	this.speach_bubble2.layerDepth = 0
	this.speach_bubble2.layerIndex = 2
	this.speach_bubble2.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.speach_bubble2).wait(1).to({x:0},0).wait(470).to({regX:-2.8,regY:-16.8,scaleX:1.0156,scaleY:1.0156,x:-0.05,y:-0.05},0).wait(1).to({regX:706.9,regY:512.8,scaleX:1,scaleY:1,x:709.65,y:529.5},0).wait(26).to({_off:true},1).wait(120));

	// speach_bubble1_obj_
	this.speach_bubble1 = new lib.Scene_1_speach_bubble1();
	this.speach_bubble1.name = "speach_bubble1";
	this.speach_bubble1.setTransform(-0.05,0,1.0976,1.0976,0,0,0,89.5,66.6);
	this.speach_bubble1.depth = 0;
	this.speach_bubble1.isAttachedToCamera = 0
	this.speach_bubble1.isAttachedToMask = 0
	this.speach_bubble1.layerDepth = 0
	this.speach_bubble1.layerIndex = 3
	this.speach_bubble1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.speach_bubble1).wait(1).to({x:0},0).wait(425).to({regX:-2.8,regY:-16.8,scaleX:1.0156,scaleY:1.0156,x:-0.05,y:-0.05},0).wait(1).to({regX:628.3,regY:262.6,scaleX:1,scaleY:1,x:631.05,y:279.3},0).wait(71).to({_off:true},1).wait(120));

	// both_from_back_obj_
	this.both_from_back = new lib.Scene_1_both_from_back();
	this.both_from_back.name = "both_from_back";
	this.both_from_back.setTransform(-0.05,0,1.0976,1.0976,0,0,0,89.5,66.6);
	this.both_from_back.depth = 0;
	this.both_from_back.isAttachedToCamera = 0
	this.both_from_back.isAttachedToMask = 0
	this.both_from_back.layerDepth = 0
	this.both_from_back.layerIndex = 4
	this.both_from_back.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.both_from_back).wait(1).to({x:0},0).wait(250).to({regX:-165.5,regY:-49.4,scaleX:0.8438,scaleY:0.8438,x:-0.05,y:-0.05},0).wait(1).to({regX:643.1,regY:941.3,scaleX:1,scaleY:1,x:808.5,y:990.65},0).wait(64).to({_off:true},1).wait(302));

	// johnny_obj_
	this.johnny = new lib.Scene_1_johnny();
	this.johnny.name = "johnny";
	this.johnny.setTransform(-0.05,0,1.0976,1.0976,0,0,0,89.5,66.6);
	this.johnny.depth = 0;
	this.johnny.isAttachedToCamera = 0
	this.johnny.isAttachedToMask = 0
	this.johnny.layerDepth = 0
	this.johnny.layerIndex = 5
	this.johnny.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.johnny).wait(1).to({x:0},0).wait(122).to({regX:5.7,regY:12.2,scaleX:0.9814,scaleY:0.9814,y:0.05},0).wait(61).to({regX:-262.2,regY:27.9,scaleX:1,scaleY:1,y:-0.05},0).wait(191).to({regX:-2.8,regY:-16.9,scaleX:1.0156,scaleY:1.0156},0).wait(1).to({regX:-14.6,regY:351,scaleX:1,scaleY:1,x:-11.8,y:367.8},0).wait(58).to({regX:-2.8,regY:-16.8,scaleX:1.0156,scaleY:1.0156,x:-0.05,y:-0.05},0).wait(1).to({regX:-14.6,regY:351,scaleX:1,scaleY:1,x:-11.85,y:367.7},0).wait(184));

	// girl_obj_
	this.girl = new lib.Scene_1_girl();
	this.girl.name = "girl";
	this.girl.setTransform(-0.05,0,1.0976,1.0976,0,0,0,89.5,66.6);
	this.girl.depth = 0;
	this.girl.isAttachedToCamera = 0
	this.girl.isAttachedToMask = 0
	this.girl.layerDepth = 0
	this.girl.layerIndex = 6
	this.girl.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.girl).wait(1).to({x:0},0).wait(122).to({regX:5.7,regY:12.2,scaleX:0.9814,scaleY:0.9814,y:0.05},0).wait(61).to({regX:-262.2,regY:27.9,scaleX:1,scaleY:1,y:-0.05},0).wait(133).to({regX:-8.3,regY:-4.8,scaleX:0.9878,scaleY:0.9878,x:0.05,y:0},0).wait(58).to({regX:-2.8,regY:-16.9,scaleX:1.0156,scaleY:1.0156,x:0,y:-0.05},0).wait(1).to({regX:1486.8,regY:305.6,scaleX:1,scaleY:1,x:1489.6,y:322.4},0).wait(58).to({regX:-2.8,regY:-16.8,scaleX:1.0156,scaleY:1.0156,x:-0.05,y:-0.05},0).wait(1).to({regX:1486.8,regY:305.6,scaleX:1,scaleY:1,x:1489.55,y:322.3},0).wait(184));

	// background_obj_
	this.background = new lib.Scene_1_background();
	this.background.name = "background";
	this.background.setTransform(668.25,376.15,1.0976,1.0976,0,0,0,698.4,409.3);
	this.background.depth = 0;
	this.background.isAttachedToCamera = 0
	this.background.isAttachedToMask = 0
	this.background.layerDepth = 0
	this.background.layerIndex = 7
	this.background.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.background).wait(1).to({regX:698.2,x:668.1},0).wait(183).to({regX:406,regY:404.1,scaleX:1,scaleY:1,x:668.2},0).wait(133).to({regX:668.1,regY:376,scaleX:0.9878,scaleY:0.9878},0).wait(58).to({regX:655.1,regY:353.6,scaleX:1.0156,scaleY:1.0156,x:668.15,y:376.2},0).wait(244));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-70.9,-305,2772.4,1820.9);
// library properties:
lib.properties = {
	id: '8510FADC23ABDB4096D925E264CB2F33',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#000000",
	opacity: 1.00,
	manifest: [
		{src:"images/johnny_atlas_1.png", id:"johnny_atlas_1"},
		{src:"sounds/johnny_1.mp3", id:"johnny_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['8510FADC23ABDB4096D925E264CB2F33'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;