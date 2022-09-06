ace.define("ace/mode/gitignore_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(require,exports,module){"use strict";var oop=require("../lib/oop"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,GitignoreHighlightRules=function(){this.$rules={start:[{token:"comment",regex:/^\s*#.*$/},{token:"keyword",regex:/^\s*!.*$/}]},this.normalizeRules()};GitignoreHighlightRules.metaData={fileTypes:["gitignore"],name:"Gitignore"},oop.inherits(GitignoreHighlightRules,TextHighlightRules),exports.GitignoreHighlightRules=GitignoreHighlightRules})),ace.define("ace/mode/gitignore",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/gitignore_highlight_rules"],(function(require,exports,module){"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,GitignoreHighlightRules=require("./gitignore_highlight_rules").GitignoreHighlightRules,Mode=function(){this.HighlightRules=GitignoreHighlightRules,this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,TextMode),function(){this.lineCommentStart="#",this.$id="ace/mode/gitignore"}.call(Mode.prototype),exports.Mode=Mode})),ace.require(["ace/mode/gitignore"],(function(m){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=m)}));