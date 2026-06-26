---
title: Goal, constraint, verify. How I work with agents.
description: Coding agents are good at doing the work and bad at knowing when they are done. Here is the loop I use to fix that, the /goal command in Claude Code that runs it, and a real example from wiring up an ORATS data feed.
date: 2026-06-25
tags:
  - agentic-coding
  - ai
  - claude-code
---

After enough time working with coding agents, one thing became clear. The agent is rarely the problem. The way I hand it the work usually is.

I ran into this on a recent project, a financial trading bot. I needed to connect to [ORATS](https://orats.com/near-eod-data) and poll their near end-of-day options data for a given ticker. If I open a session and just ask it to "connect the bot to ORATS," I get something back, and sometimes it is close. More often it drifts. It starts reshaping how the rest of the service will consume the data, or it wires up the call and leaves me with no way to tell whether the response is even correct. That is not the model falling short. It is me never defining what done looks like.

These days every real task runs through the same three steps before I let the agent go. Goal, constraint, verify. Then I keep it in that loop until the work actually lands.

## The goal

The goal is the part most people assume they already have covered, and most of the time they do not.

"Connect to ORATS" is a direction, not a goal. A goal describes what done looks like in terms you can actually check. Mine was simple enough: the server calls ORATS with a ticker and the option details, and gets back the matching near end-of-day data. A real input, a real output, and something concrete to point at when the agent claims it is finished.

The test I use is to write the goal as if I am describing the finished thing to someone who has to build it without asking me a single follow up question.

## The constraints

Constraints are the rails. They cover everything the agent is not allowed to do on its way to the goal, and they are where most of my old pain came from.

Agents like to be helpful in ways you never asked for. They will rewrite a working file, pull in a new dependency, reformat code that was already fine, or quietly refactor three things you never mentioned. Each one is a small surprise on its own, and they add up faster than you would think.

So I make the rails explicit. On the ORATS task the important one was scope: the agent was responsible for the interface to ORATS and nothing else. How the rest of the service used that data was off limits. That single line kept it from wandering into the trading logic and tidying up code I never asked it to touch. The smaller rails matter too, things like not adding dependencies, staying inside the files I named, matching the existing style, and checking with me before any change that turns out bigger than expected.

Tight constraints keep the change small enough that I can actually review it and trust what I am about to merge.

## The verify

Verify is the step people skip, and it is the one that earns its keep.

A verification is the objective check that tells both you and the agent whether the goal is really met. Not "looks good to me," but something that can actually be run. For the ORATS work it was a single integration test: send a ticker and the option details, then assert that the data I asked for comes back. If the test passes, the interface works. If it fails, it does not, and there is nothing to argue about.

That last part is the whole reason verification matters. An agent will tell you the work is done, and it will tell you with complete confidence while the thing is plainly broken. A real check takes that conversation off the table. Whenever I can, I hand the agent a check it can run on its own, so it catches its own mistakes long before the work comes back to me.

## The loop

This is where it comes together, and it is the actual point. Goal, constraint, verify is not a checklist you run once. It is a loop. The agent works toward the goal, stays inside the constraints, and runs the check. If the check fails, it goes back and tries again, then checks again. It does not stop until the check passes.

That is the part that saves me. I am not standing over every step. I set the target, set the guardrails, define the check, and let the agent work that check until it gets there. My job is a sharp goal and a check that means something. The agent's job is to keep looping until both hold.

## The /goal command

I do not have to run this loop by hand, because Claude Code has it built in. The command is /goal.

You give it a completion condition, and Claude keeps working toward that condition across turns without you prompting each step. After every turn a small fast model checks whether the condition has been met. If it has not, Claude takes another turn instead of handing control back to you, and once it holds, the goal clears on its own. It is the same loop, running by itself until the work is done.

What I like about it is how cleanly it fits the framework. A good condition is really just goal, constraint, and verify written as a single line. The documentation describes a solid condition the same way: a measurable end state, a check that proves it, and the constraints that must not change along the way. The framework is not separate from the tool. It is how you write a condition the tool can actually finish.

Mine for the ORATS work looked roughly like this:

```
/goal the ORATS integration test passes for the given ticker and option details, the response contains the data we requested, and nothing outside the ORATS interface is changed
```

Goal, check, and constraint, all in one line.

One detail caught me early and is worth knowing. The model evaluating your condition does not run your tests or read your files on its own. It only sees what Claude has already put in the conversation, so the check has to be something Claude actually runs and prints. The ORATS test counts because Claude runs it and the result lands in the transcript. If the proof never shows up in the output, the evaluator cannot see it, and the loop will not end when you expect it to.

None of this depends on a smarter agent. It comes down to handing the work over in a shape the agent can succeed at. Say what done looks like, put up the guardrails, give it a check it can run, and let it loop until that check passes.

The models made significant improvements quickly. The thing that actually made the difference for me was not waiting for a better one. It was learning to write a better goal.
