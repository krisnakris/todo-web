const jwt = require('jsonwebtoken')

const decoded = jwt.verify(
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJrcmlzbmFAZ21haWwuY29tIiwiaWF0IjoxNjE0NjYwODAzfQ.6IbGSo94uB0axf9OI8mUElC4IVnmNaGk3tLdWAabgo4'
  , 'sweet kitten'
)

console.log(decoded);