/* Generated file based on ejs templates */
define([], function() {
    return {
    "Python.py.ejs": "# <%=mainName%>\r\n<%\r\nvar i, dataObj;\r\nfor (i=0; i < dataObjects.length; i += 1) {\r\n    dataObj = dataObjects[i];%>\r\nprint \"<%=dataObj.a%> and <%=dataObj.b%> provided.\"<%}%>"
}});