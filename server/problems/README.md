Test creator
==========
To start using test creator you should import 'test-creator.js' file.
```
const testCreator = require('path/test-creator');
```
After that you can use follow functions:
|Function|Arguments|Arguments description|Returning value   
|-|-|-|-
|createProblemsPack|problemsLevels|Array of strings. Each string stands for level of problem complexity. Possible values: 'e', 'easy', 'm', 'medium', 'h', 'hard'. The input array length is equal to output array length|Array of problems/questions
|createStandardProblemsPack| - | - |Array of problems/questions containing 12 elements

If you don't want some specific problems pack, it is high recommended to use 'createStandardProblemsPack' function.

The problems/questions is an array of form:
```
[
	{
		problem: [ strings ]
		options: [ strings ]
		rightAnswer: number
	},
	...
]
```

