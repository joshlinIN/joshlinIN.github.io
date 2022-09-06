ace.define("ace/mode/nim_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(require,exports,module){"use strict";var oop=require("../lib/oop"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,NimHighlightRules=function(){var keywordMapper=this.createKeywordMapper({variable:"var|let|const",keyword:"assert|parallel|spawn|export|include|from|template|mixin|bind|import|concept|raise|defer|try|finally|except|converter|proc|func|macro|method|and|or|not|xor|shl|shr|div|mod|in|notin|is|isnot|of|static|if|elif|else|case|of|discard|when|return|yield|block|break|while|echo|continue|asm|using|cast|addr|unsafeAddr|type|ref|ptr|do|declared|defined|definedInScope|compiles|sizeOf|is|shallowCopy|getAst|astToStr|spawn|procCall|for|iterator|as","storage.type":"newSeq|int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|float|char|bool|string|set|pointer|float32|float64|enum|object|cstring|array|seq|openArray|varargs|UncheckedArray|tuple|set|distinct|void|auto|openarray|range","support.function":"lock|ze|toU8|toU16|toU32|ord|low|len|high|add|pop|contains|card|incl|excl|dealloc|inc","constant.language":"nil|true|false"},"identifier"),floatNumber="(?:[\\d][\\d_]*(?:[.][\\d](?:[\\d_]*)(?:[eE][+-]?[\\d][\\d_]*)?)|(?:[eE][+-]?[\\d][\\d_]*))",identifier="[a-zA-Z][a-zA-Z0-9_]*";this.$rules={start:[{token:["identifier","keyword.operator","support.function"],regex:"("+identifier+")([.]{1})("+identifier+")(?=\\()"},{token:"paren.lparen",regex:"(\\{\\.)",next:[{token:"paren.rparen",regex:"(\\.\\}|\\})",next:"start"},{include:"methods"},{token:"identifier",regex:identifier},{token:"punctuation",regex:/[,]/},{token:"keyword.operator",regex:/[=:.]/},{token:"paren.lparen",regex:/[[(]/},{token:"paren.rparen",regex:/[\])]/},{include:"math"},{include:"strings"},{defaultToken:"text"}]},{token:"comment.doc.start",regex:/##\[(?!])/,push:"docBlockComment"},{token:"comment.start",regex:/#\[(?!])/,push:"blockComment"},{token:"comment.doc",regex:"##.*$"},{token:"comment",regex:"#.*$"},{include:"strings"},{token:"string",regex:"'(?:\\\\(?:[abercnlftv]|x[0-9A-Fa-f]{2}|[0-2][0-9]{2}|u[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})|.{1})?'"},{include:"methods"},{token:keywordMapper,regex:"[a-zA-Z][a-zA-Z0-9_]*\\b"},{token:["keyword.operator","text","storage.type"],regex:"([:])(\\s+)("+identifier+")(?=$|\\)|\\[|,|\\s+=|;|\\s+\\{)"},{token:"paren.lparen",regex:/\[\.|{\||\(\.|\[:|[[({`]/},{token:"paren.rparen",regex:/\.\)|\|}|\.]|[\])}]/},{token:"keyword.operator",regex:/[=+\-*\/<>@$~&%|!?^.:\\]/},{token:"punctuation",regex:/[,;]/},{include:"math"}],blockComment:[{regex:/#\[]/,token:"comment"},{regex:/#\[(?!])/,token:"comment.start",push:"blockComment"},{regex:/]#/,token:"comment.end",next:"pop"},{defaultToken:"comment"}],docBlockComment:[{regex:/##\[]/,token:"comment.doc"},{regex:/##\[(?!])/,token:"comment.doc.start",push:"docBlockComment"},{regex:/]##/,token:"comment.doc.end",next:"pop"},{defaultToken:"comment.doc"}],math:[{token:"constant.float",regex:"(?:(?:0[xX][\\dA-Fa-f][\\dA-Fa-f_]*)(?:'(?:(?:[fF](?:32|64)?)|[dD])))|(?:(?:[\\d][\\d_]*(?:[.][\\d](?:[\\d_]*)(?:[eE][+-]?[\\d][\\d_]*)?)|(?:[eE][+-]?[\\d][\\d_]*))|(?:[0-9][\\d_]*)|(?:0o[0-7][0-7_]*)|(?:0[bB][01][01_]*))(?:'(?:(?:[fF](?:32|64)?)|[dD]))"},{token:"constant.float",regex:floatNumber},{token:"constant.integer",regex:"(?:(?:0[xX][\\dA-Fa-f][\\dA-Fa-f_]*)|(?:[0-9][\\d_]*)|(?:0o[0-7][0-7_]*)|(?:0[bB][01][01_]*))(?:'?[iIuU](?:8|16|32|64)|u)?\\b"}],methods:[{token:"support.function",regex:"(\\w+)(?=\\()"}],strings:[{token:"string",regex:"(\\b"+identifier+')?"""',push:[{token:"string",regex:'"""',next:"pop"},{defaultToken:"string"}]},{token:"string",regex:"\\b"+identifier+'"(?=.)',push:[{token:"string",regex:'"|$',next:"pop"},{defaultToken:"string"}]},{token:"string",regex:'"',push:[{token:"string",regex:'"|$',next:"pop"},{token:"constant.language.escape",regex:"\\\\([abeprcnlftv\\\"']|x[0-9A-Fa-f]{2}|[0-2][0-9]{2}|u[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})"},{defaultToken:"string"}]}]},this.normalizeRules()};oop.inherits(NimHighlightRules,TextHighlightRules),exports.NimHighlightRules=NimHighlightRules})),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],(function(require,exports,module){"use strict";var oop=require("../../lib/oop"),Range=require("../../range").Range,BaseFoldMode=require("./fold_mode").FoldMode,FoldMode=exports.FoldMode=function(commentRegex){commentRegex&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+commentRegex.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+commentRegex.end)))};oop.inherits(FoldMode,BaseFoldMode),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(session,foldStyle,row){var line=session.getLine(row);if(this.singleLineBlockCommentRe.test(line)&&!this.startRegionRe.test(line)&&!this.tripleStarBlockCommentRe.test(line))return"";var fw=this._getFoldWidgetBase(session,foldStyle,row);return!fw&&this.startRegionRe.test(line)?"start":fw},this.getFoldWidgetRange=function(session,foldStyle,row,forceMultiline){var match,line=session.getLine(row);if(this.startRegionRe.test(line))return this.getCommentRegionBlock(session,line,row);if(match=line.match(this.foldingStartMarker)){var i=match.index;if(match[1])return this.openingBracketBlock(session,match[1],row,i);var range=session.getCommentFoldRange(row,i+match[0].length,1);return range&&!range.isMultiLine()&&(forceMultiline?range=this.getSectionRange(session,row):"all"!=foldStyle&&(range=null)),range}if("markbegin"!==foldStyle&&(match=line.match(this.foldingStopMarker))){i=match.index+match[0].length;return match[1]?this.closingBracketBlock(session,match[1],row,i):session.getCommentFoldRange(row,i,-1)}},this.getSectionRange=function(session,row){for(var line=session.getLine(row),startIndent=line.search(/\S/),startRow=row,startColumn=line.length,endRow=row+=1,maxRow=session.getLength();++row<maxRow;){var indent=(line=session.getLine(row)).search(/\S/);if(-1!==indent){if(startIndent>indent)break;var subRange=this.getFoldWidgetRange(session,"all",row);if(subRange){if(subRange.start.row<=startRow)break;if(subRange.isMultiLine())row=subRange.end.row;else if(startIndent==indent)break}endRow=row}}return new Range(startRow,startColumn,endRow,session.getLine(endRow).length)},this.getCommentRegionBlock=function(session,line,row){for(var startColumn=line.search(/\s*$/),maxRow=session.getLength(),startRow=row,re=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,depth=1;++row<maxRow;){line=session.getLine(row);var m=re.exec(line);if(m&&(m[1]?depth--:depth++,!depth))break}if(row>startRow)return new Range(startRow,startColumn,row,line.length)}}.call(FoldMode.prototype)})),ace.define("ace/mode/nim",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/nim_highlight_rules","ace/mode/folding/cstyle"],(function(require,exports,module){"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,NimHighlightRules=require("./nim_highlight_rules").NimHighlightRules,CStyleFoldMode=require("./folding/cstyle").FoldMode,Mode=function(){TextMode.call(this),this.HighlightRules=NimHighlightRules,this.foldingRules=new CStyleFoldMode,this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,TextMode),function(){this.lineCommentStart="#",this.blockComment={start:"#[",end:"]#",nestable:!0},this.$id="ace/mode/nim"}.call(Mode.prototype),exports.Mode=Mode})),ace.require(["ace/mode/nim"],(function(m){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=m)}));