# What is Regex
#regex
Friday, June 15, 2018

**What is Regex?**
A regular expression (regex) is a tool for specifying patterns within strings of text. This commonly includes words, numbers or individual characters.

Every major programming language has support for regular expressions. 

Javascript syntax:
`/regex pattern goes here/.test(string to validate);`

Javascript example:
```
var emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/;`
emailRegex.test("gregor.richardson@gmail.com") // returns true
```

