import { Pipe, PipeTransform } from '@angular/core';
import { Exercise } from '@dashboard/shared/interfaces/exercise.interface';

@Pipe({
  name: 'exerciseImage'
})
export class ExerciseImagePipe implements PipeTransform {

  transform( exercise: Exercise ): string {

    if ( exercise.id && exercise.image ) {
      return exercise.image;
    }

    if ( !exercise.image && exercise.alternativeImage ) {
      return exercise.alternativeImage
    }

    return 'assets/images/non_exercise.webp'

  }

}
