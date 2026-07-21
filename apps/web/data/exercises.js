const exercises = {
  golang: {
    'week-01': {
      '01-introduction': [
        {
          type: 'multiple-choice',
          question: 'What package must every executable Go program have?',
          options: ['package fmt', 'package main', 'package os', 'package io'],
          answer: 1,
          explanation: 'The main package is required for executable programs. It tells Go to build a binary.'
        },
        {
          type: 'multiple-choice',
          question: 'What is the entry point of a Go program?',
          options: ['func start()', 'func init()', 'func main()', 'func run()'],
          answer: 2,
          explanation: 'func main() is the entry point. Execution starts here.'
        },
        {
          type: 'code-challenge',
          question: 'Write a Go program that prints "Welcome to Go!" to the console.',
          starterCode: 'package main\n\nimport "fmt"\n\nfunc main() {\n    // Your code here\n}',
          solution: 'fmt.Println("Welcome to Go!")',
          hint: 'Use fmt.Println()'
        }
      ],
      '02-installation': [
        {
          type: 'multiple-choice',
          question: 'Which command verifies Go is installed correctly?',
          options: ['go check', 'go version', 'go status', 'go verify'],
          answer: 1,
          explanation: 'go version displays the installed Go version.'
        }
      ],
      '03-hello-world': [
        {
          type: 'multiple-choice',
          question: 'What does fmt.Println() do?',
          options: ['Reads user input', 'Prints text with a newline', 'Formats a string', 'Creates a file'],
          answer: 1,
          explanation: 'Println prints the given text followed by a newline character.'
        },
        {
          type: 'code-challenge',
          question: 'Modify Hello World to print "Hello, Gopher!" instead.',
          starterCode: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
          solution: 'fmt.Println("Hello, Gopher!")',
          hint: 'Change the text inside the quotes'
        }
      ],
      '04-go-mod': [
        {
          type: 'multiple-choice',
          question: 'Which command initializes a new Go module?',
          options: ['go init', 'go mod init', 'go module init', 'go create'],
          answer: 1,
          explanation: 'go mod init creates a new go.mod file.'
        }
      ],
      '05-ide-setup': [
        {
          type: 'multiple-choice',
          question: 'What is the recommended Go extension for VS Code?',
          options: ['go.go', 'golang.go', 'vscode-go', 'gopls'],
          answer: 1,
          explanation: 'The official Go extension is "golang.go" by the Go team.'
        }
      ]
    },
    'week-02': {
      '01-variables': [
        {
          type: 'multiple-choice',
          question: 'Which is the correct short variable declaration in Go?',
          options: ['x := 5', 'x = 5', 'var x = 5', 'let x = 5'],
          answer: 0,
          explanation: ':= is the short declaration operator used inside functions.'
        },
        {
          type: 'code-challenge',
          question: 'Declare a variable named "name" with value "Gopher" using short declaration, then print it.',
          starterCode: 'package main\n\nimport "fmt"\n\nfunc main() {\n    \n}',
          solution: 'name := "Gopher"\nfmt.Println(name)',
          hint: 'Use := to declare and assign in one step'
        }
      ],
      '02-constants': [
        {
          type: 'multiple-choice',
          question: 'What value does the first use of iota get?',
          options: ['1', '0', 'It varies', 'undefined'],
          answer: 1,
          explanation: 'iota starts at 0 within a const block and increments by 1.'
        }
      ],
      '03-data-types': [
        {
          type: 'multiple-choice',
          question: 'What is the default type for a float literal like 3.14?',
          options: ['float32', 'float64', 'float', 'double'],
          answer: 1,
          explanation: 'Go defaults to float64 for floating-point literals.'
        }
      ],
      '04-zero-values': [
        {
          type: 'multiple-choice',
          question: 'What is the zero value of a string in Go?',
          options: ['null', 'undefined', '"" (empty string)', 'nil'],
          answer: 2,
          explanation: 'The zero value of a string is an empty string "".'
        }
      ],
      '05-fmt': [
        {
          type: 'code-challenge',
          question: 'Print "Name: Alice, Age: 30" using Printf with %s and %d verbs.',
          starterCode: 'package main\n\nimport "fmt"\n\nfunc main() {\n    name := "Alice"\n    age := 30\n    \n}',
          solution: 'fmt.Printf("Name: %s, Age: %d\\n", name, age)',
          hint: 'Use %s for string and %d for integer'
        }
      ]
    }
  }
}

export async function getExercises(language, moduleId, lessonId) {
  const langEx = exercises[language]
  if (!langEx) return []

  const modEx = langEx[moduleId]
  if (!modEx) return []

  return modEx[lessonId] || []
}
