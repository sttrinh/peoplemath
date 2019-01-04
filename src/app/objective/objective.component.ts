import { Component, OnInit, Input } from '@angular/core';
import { Objective } from '../objective';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.css']
})
export class ObjectiveComponent implements OnInit {
  @Input() objective: Objective;
  @Input() unit: string;
  @Input() validAssignees: string[];
  isEditing: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  nonDupeValidAssignees(): string[] {
    const usedAssignees = this.objective.assignments.map(assignment => assignment.personId);
    return this.validAssignees.filter(personId => usedAssignees.filter(pid => pid === personId).length < 2);
  }

  edit(): void {
    this.isEditing = true;
  }

  stopEditing(): void {
    this.isEditing = false;
  }
}