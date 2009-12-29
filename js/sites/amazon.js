// TODO(bradfitz): this isn't actually case-sensitive.  jsmarr said it was.  :)
var amazonPkHandler = nodemapper.createFirstMatchHandler([
     nodemapper.createSomethingSlashUsernameHandler(
         "gp/pdp/profile", "amazon.com",
         {keyName: "pk", casePreserve: 1}),
     nodemapper.createSomethingSlashUsernameHandler(
         "rss/people", "amazon.com",
         {keyName: "pk", casePreserve: 1})]);

nodemapper.registerDomain("amazon.com", {
  accountToSgn: { pk: ["amazon.com", /^\w{14,14}$/] },
  urlToGraphNode: amazonPkHandler,
  name: "Amazon.com"
});

nodemapper.registerDomain("amazon.co.uk", {
  urlToGraphNode: amazonPkHandler
});

nodemapper.addSimpleHandler("amazon.com", "pk_to_profile", 
    "http://www.amazon.com/gp/pdp/profile/");
nodemapper.addSimpleHandler("amazon.com", "pk_to_rss",
    "http://www.amazon.com/rss/people/", "/reviews");
