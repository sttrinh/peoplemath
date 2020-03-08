/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { Period } from '../period';
import { Bucket } from '../bucket';
import { Objective, totalResourcesAllocated, objectiveResourcesAllocated } from '../objective';

@Component({
  selector: 'app-group-summary',
  templateUrl: './group-summary.component.html',
  styleUrls: ['./group-summary.component.css']
})
export class GroupSummaryComponent implements OnInit {
  @Input() period: Period;
  @Input() groupType: string;
  showObjectives: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  bucketObjectivesByGroup(bucket: Bucket): Array<[string, Objective[]]> {
    // We order groups by the order the first item from each appears within the bucket
    let groupOrder: string[] = [];
    let obsByGroup = new Map<string, Objective[]>();
    let noGroup: Objective[] = [];
    bucket.objectives.forEach(o => {
      let gs = o.groups.filter(g => g.groupType == this.groupType);
      if (gs.length > 0) {
        let groupName = gs[0].groupName;
        if (obsByGroup.has(groupName)) {
          obsByGroup.get(groupName).push(o);
        } else {
          obsByGroup.set(groupName, [o]);
          groupOrder.push(groupName);
        }
      } else {
        noGroup.push(o);
      }
    });
    let result: Array<[string, Objective[]]> = groupOrder.map(g => [g, obsByGroup.get(g)]);
    if (noGroup.length > 0) {
      result.push(['No ' + this.groupType, noGroup]);
    }
    return result;
  }

  totalResourcesAllocated(objectives: Objective[]) {
    return totalResourcesAllocated(objectives);
  }

  isFullyFunded(objectives: Objective[]): boolean {
    for (let objective of objectives) {
      let totalAllocated = objectiveResourcesAllocated(objective);
      if (totalAllocated < objective.resourceEstimate) {
        return false;
      }
    }
    return true;
  }

  isPartiallyFunded(objectives: Objective[]): boolean {
    for (let objective of objectives) {
      let totalAllocated = objectiveResourcesAllocated(objective);
      if (totalAllocated > 0 && totalAllocated < objective.resourceEstimate) {
        return true;
      }
    }
    return false;
  }

  isUnfunded(objectives: Objective[]): boolean {
    for (let objective of objectives) {
      let totalAllocated = objectiveResourcesAllocated(objective);
      if (totalAllocated > 0) {
        return false;
      }
    }
    return true;
  }
}
