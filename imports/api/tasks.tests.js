/* eslint-env mocha*/

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Tasks } from './tasks.js';

if ( Meteor.isServer) {
	describe('Tasks', () => {
		describe('methods', () => {
			const userId = Random.id();
			let taskId;

			beforeEach(() => {
				Tasks.remove ({});
				taskId = Tasks.insert({
					text: 'test task',
					createdAt: new Date(),
					owner: userId,
					username: 'testuser',
				});
			});

			it('can delete owned task', ()=> {
				// Find the internal implementation of the task method so we can
				// test it in isolation
				const deleteTask = Meteor.server.method_handlers['tasks.remove'];

				// Set up a fake method invocation thats looks like what the methods expects
				const invocation = { userId };

				// Run the method with 'this' set to the fake invocation
				deleteTask.apply(invocation, [taskId]);

				// Verify that the method does what the expected
				assert.equal(Tasks.find().count(), 0);
			});

			/*it('can insert task', ()=> {
				const insertTask = Meteor.server.method_handlers['tasks.insert'];

				const invocation = { userId };

				insertTask.apply(invocation, [taskId]);

				assert.equal(Tasks.find().count(), 0);
			});*/
		});
	});
}