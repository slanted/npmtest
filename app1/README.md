- richard maintains testlib1
- he locally links to it
- denys has a dependency on testlib1
- sometimes he wants to make a change to it as well
- denys checks out testlib1 and links to it from his app

- Richard and Denys are co-developing testlib1. They want to release separately
- When each developer 'checks in' some code they think is good, the jenkins job for that modules wakes up and publishes a 'prerelease' version.
- Suppose that Richard makes 2 changes and they are for 1.1.0-SNAPSHOT.1. Denys gets those changes in 1 of 2 ways:
    - He either just updates his local testlib1 repo with 'git pull' if he is linked or
    - He changes his dependencies to '^1.1.0-SNAPSHOT' for testlib1 and does a 'npm install'

- Problem: what happens if Denys is pointed at Richard's snapshot of testlib1, but he's ready to deploy his app, but testlib1 hasn't made it to 1.1.0 yet? Denys has been waiting the whole time for Richard to release but Richard is still not done yet.
    Now Denys needs to wait, because he's been integration testing against the snapshot the whole time.


- This would be different if it was Denys that was making a change to testlib1, because he has the release under his control.
- So let's say that its Denys that is making the changes to testlib1. He changes the vesion to 1.1.0-SNAPSHOT.1, makes some changes, and points his app at ^1.1.0-SNAPSHOT for the testlib dependency.
- When he is ready to release his app he would: release testlib under 1.1.0. QA tests this and finds a bug in test. Denys goes to 1.1.1. This is problematic, because some people in a live environment would get the buggy 1.1.0 version. This wont work.

- Feature toggle option:
    - Denys makes changes in testlib1, but he makes the changes behind a feature toggle. He commits the change and the jenkins job runs.
    - Denys's app is clover and uses testlib1. Clover has its own feature toggle system that has 'feature1' as on.
    - Richard's app has feature1 as off. Holy crap, what if Nate's and Chad's and Eric's apps all use testlib1. Do they all have to have separate feature toggles for feature1???
    - Let's say that Denys' change is tested with clover and looks good. Denys commits to master, the CI job runs. The unit tests pass, making sure nothing breaks the build. That should be good enough and the CI job publishes 1.1.0. But by default the feature is off. Suppose there are 3 outside parties using testlib1. They shouldn't see the feature, because they have to explicitly turn the feature on. How do they know that the feature is there?
    