/**
 * @license RequireJS text 1.0.8 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

(function(){var progIds=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],xmlRegExp=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,bodyRegExp=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,hasLocation=typeof location!="undefined"&&location.href,defaultProtocol=hasLocation&&location.protocol&&location.protocol.replace(/\:/,""),defaultHostName=hasLocation&&location.hostname,defaultPort=hasLocation&&(location.port||undefined),buildMap=[];define([],function(){var text,fs;return text={version:"1.0.8",strip:function(content){if(content){content=content.replace(xmlRegExp,"");var matches=content.match(bodyRegExp);matches&&(content=matches[1])}else content="";return content},jsEscape:function(content){return content.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")},createXhr:function(){var xhr,i,progId;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;if(typeof ActiveXObject!="undefined")for(i=0;i<3;i++){progId=progIds[i];try{xhr=new ActiveXObject(progId)}catch(e){}if(xhr){progIds=[progId];break}}return xhr},parseName:function(name){var strip=!1,index=name.indexOf("."),modName=name.substring(0,index),ext=name.substring(index+1,name.length);return index=ext.indexOf("!"),index!==-1&&(strip=ext.substring(index+1,ext.length),strip=strip==="strip",ext=ext.substring(0,index)),{moduleName:modName,ext:ext,strip:strip}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(url,protocol,hostname,port){var match=text.xdRegExp.exec(url),uProtocol,uHostName,uPort;return match?(uProtocol=match[2],uHostName=match[3],uHostName=uHostName.split(":"),uPort=uHostName[1],uHostName=uHostName[0],(!uProtocol||uProtocol===protocol)&&(!uHostName||uHostName===hostname)&&(!uPort&&!uHostName||uPort===port)):!0},finishLoad:function(name,strip,content,onLoad,config){content=strip?text.strip(content):content,config.isBuild&&(buildMap[name]=content),onLoad(content)},load:function(name,req,onLoad,config){if(config.isBuild&&!config.inlineText){onLoad();return}var parsed=text.parseName(name),nonStripName=parsed.moduleName+"."+parsed.ext,url=req.toUrl(nonStripName),useXhr=config&&config.text&&config.text.useXhr||text.useXhr;!hasLocation||useXhr(url,defaultProtocol,defaultHostName,defaultPort)?text.get(url,function(content){text.finishLoad(name,parsed.strip,content,onLoad,config)}):req([nonStripName],function(content){text.finishLoad(parsed.moduleName+"."+parsed.ext,parsed.strip,content,onLoad,config)})},write:function(pluginName,moduleName,write,config){if(buildMap.hasOwnProperty(moduleName)){var content=text.jsEscape(buildMap[moduleName]);write.asModule(pluginName+"!"+moduleName,"define(function () { return '"+content+"';});\n")}},writeFile:function(pluginName,moduleName,req,write,config){var parsed=text.parseName(moduleName),nonStripName=parsed.moduleName+"."+parsed.ext,fileName=req.toUrl(parsed.moduleName+"."+parsed.ext)+".js";text.load(nonStripName,req,function(value){var textWrite=function(contents){return write(fileName,contents)};textWrite.asModule=function(moduleName,contents){return write.asModule(moduleName,fileName,contents)},text.write(pluginName,nonStripName,textWrite,config)},config)}},text.createXhr()?text.get=function(url,callback){var xhr=text.createXhr();xhr.open("GET",url,!0),xhr.onreadystatechange=function(evt){xhr.readyState===4&&callback(xhr.responseText)},xhr.send(null)}:typeof process!="undefined"&&process.versions&&!!process.versions.node?(fs=require.nodeRequire("fs"),text.get=function(url,callback){var file=fs.readFileSync(url,"utf8");file.indexOf("﻿")===0&&(file=file.substring(1)),callback(file)}):typeof Packages!="undefined"&&(text.get=function(url,callback){var encoding="utf-8",file=new java.io.File(url),lineSeparator=java.lang.System.getProperty("line.separator"),input=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file),encoding)),stringBuffer,line,content="";try{stringBuffer=new java.lang.StringBuffer,line=input.readLine(),line&&line.length()&&line.charAt(0)===65279&&(line=line.substring(1)),stringBuffer.append(line);while((line=input.readLine())!==null)stringBuffer.append(lineSeparator),stringBuffer.append(line);content=String(stringBuffer.toString())}finally{input.close()}callback(content)}),text})})()