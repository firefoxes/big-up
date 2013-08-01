/*
  Take as an input a hash with the following keys:
  messageTokens: [ ["t" , "shoutout to "], ["r", "Myles Byrne"], ["t", "for talking about data structures"] ]
  authorName: "Myles Byrne"
  authorAvatarURL: "http://gravatar.... " expectedSize = 32x32...
  timeStamp: Date object

  Produces as output:
  see:  post.html
*/

var ms = require('hogan.js')
  , resumer = require('resumer')
  , fs = require('fs')
  , templateSrc = fs.readFileSync('./post.html.mustache','utf8')
  , template = ms.compile(templateSrc)

module.exports = renderPost

function renderPost(view){

  // dasherizeKeys() ?
  view['author-avatar-url'] = view.authorAvatarURL
  view['author-name']       = view.authorName

  var renderedHTML = template.render(view)

  return resumer().queue(renderedHTML).end()
}

function shortenName(fullName){
  // comment "Myles B."
}

function renderPostMessage(messageTokens){

}

if (!module.parent) {

  // Integration test - check that the html renders

  var view = {
    message: 'Shoutout to <span class="recipient">Myles B.</span> for talking about data structures!',
    timestamp: 1234567890,
    authorAvatarURL: "http://gravatar...",
    authorName: "Robert B."
  }

  renderPost(view).pipe(process.stdout)

  // var assert = require('assert')

  // // Tests
  // var actual = renderPostMessage([
  //   ["t" , "shoutout to "],
  //   ["r", "Myles Byrne"],
  //   ["t", "for talking about data structures"]
  // ])
  // var expected = 'Shoutout to <span class="recipient">Myles B.</span> for talking about data structures!'

  // assert.strictEqual(expected, actual)

}

