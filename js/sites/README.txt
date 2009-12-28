*.js files in this directory are concatenated together, after
 nodemapper-base.js, to form the master nodemapper.js file.

Everything past the  __END__ line in the JS files is interpreted
as tests for that file.  The tests lines are to be one of two forms:

1) URL to node identifier:
   <url>     <clean_node_identifer>

Where url is anything ugly seen on the web, and clean_node_identifier
is a cleaned up version of that URL for known social networking sites,
or a cleaned up (or same) version of that URL.

2) Node identifier to some URL;
   url(<ident>)        <url>
   profile(<ident>)    <url>
   addfriend(<ident>)  <url>

URLs of various functions of the URL.  Exact definitions to be
fleshed out later.







