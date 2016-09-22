# `commit-from`

> Create a commit message from ticket details from issue sources.

## Why would I use this?

Because:

* Automate all the things.
* Save time by rapidly producing commit messages without switching contexts.
* Enable automated releases by always including necessary metadata.

Currently support issue sources:

* GitHub
* Jira

## Getting Started

Install [node.js][] 4+.

### Install via NPM

```bash
$ npm install -g commit-from
```

## Configuration

Configuration is provided from the `.cfconfig` file in the user's home directory.

### Example

```properties
[github]
  issuePrefix = issue-
  template = ~/.gittemplates/github.txt

[jira]
  apiVersion = 2
  host = jira.myhost.org
  password = SprSrsPsswrd1234!@#$
  protocol = https
  strictSSL = true
  template = ~/.gittemplates/jira.txt
  username = someuser
```

## Help

```bash
$ commit-from -h
```

## Git Aliases

```gitconfig
# git config file
[alias]
  # current branch name
  current-branch=!git rev-parse --abbrev-ref HEAD
  cb=!git current-branch

  # commit with a message generated from a supported issue source
  commit-from = "!f() { git commit -e -m \"$(CB=$(git cb); if [[ $(dirname "${CB}") = "." ]]; then echo ""; else commit-from $1 $(basename "${CB}") ${@:2}; fi)\"; }; f"
  cf = !git commit-from

  # commit with a message generated from GitHub
  commit-from-github = !git commit-from github
  cfg = !git commit-from-github

  # commit all with a message generated from GitHub
  commit-all-from-github = "!f() { git add -A && git cfg ${@}; }; f"
  cafg = !git commit-all-from-github

  # commit with a message generated from Jira
  commit-from-jira = !git commit-from jira
  cfj = !git commit-from-jira

  # commit all with a message generated from Jira
  commit-all-from-jira = "!f() { git add -A && git cfj ${@}; }; f"
  cafj = !git commit-all-from-jira
```

## Creating a Git Commit

```bash
$ git add <files>
$ git cfg # From GitHub
$ git cfj # From Jira

# or commit all the things
$ git cafg
$ git cafj

# use a custom template
$ git cfg -t /path/to/template.txt
$ git cfj -t /path/to/template.txt
```

[node.js]: https://github.com/nodejs/node-v0.x-archive/wiki/Installing-Node.js-via-package-manager
