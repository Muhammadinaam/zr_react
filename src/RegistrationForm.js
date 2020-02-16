import React from 'react'
import { Card, CardHeader, CardFooter, CardBody, Spinner, FormGroup, Label, Input } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';
import FormikDatetime from './components/FormikDatetime'
import moment from 'moment';

export default function RegistrationForm() {

    const courses = [
        { id: 1, name: 'Technical Report Writing' },
        { id: 2, name: 'English Literature' },
        { id: 3, name: 'Computer Sciences' },
    ];

    const subjects = [
        { id: 1, course_id: 1, name: 'Short Reports' },
        { id: 2, course_id: 1, name: 'Annual Reports' },
        { id: 3, course_id: 1, name: 'Presentations' },
        { id: 4, course_id: 2, name: 'Poetry' },
        { id: 5, course_id: 2, name: 'Short Stories' },
        { id: 6, course_id: 2, name: 'Drama' },
        { id: 7, course_id: 3, name: 'Web Development' },
        { id: 8, course_id: 3, name: 'Desktop Software Development' },
        { id: 9, course_id: 3, name: 'Research and Analysis' }
    ];

    return (
        <Card>
            <CardHeader>Registration Form</CardHeader>

            <Formik
                initialValues={{ course: 1, subject: '', start_date: moment('2019-12-20', 'YYYY-MM-DD'), additional_notes: '' }}
                validate={values => {
                    const errors = {};
                    if(values.course == '' || values.course == null) {
                        errors.course = 'Please select course';
                    }
                    if(values.subject == '') {
                        errors.subject = 'Please select subject';
                    }
                    if(values.start_date == '' || values.start_date == null) {
                        errors.start_date = 'Please select Start Date';
                    }

                    const startDate = moment(values.start_date);
                    if( !startDate.isSame(moment('2019-12-20', 'YYYY-MM-DD'))  &&
                        !startDate.isSame(moment('2019-01-15', 'YYYY-MM-DD'))  &&
                        !startDate.isSame(moment('2019-02-01', 'YYYY-MM-DD')) ) {
                        errors.start_date = 'Your selected course and subject is not offered beginning from your selected date.';
                    }

                    if(values.additional_notes != '')
                    {
                        if(values.additional_notes.length < 20)
                            errors.additional_notes = 'Additional Notes should not be less than 20 characters';
                        
                        if(values.additional_notes.length > 500)
                            errors.additional_notes = 'Additional Notes should not be more than 500 characters';    
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        console.log(values);

                        Swal.fire({
                            icon: 'success',
                            title: 'Done',
                            text: 'Your course has been successfully registered.',
                        })

                        setSubmitting(false);
                    }, 3000);
                }}
            >
                {({ isSubmitting, values, setFieldValue, errors }) => (
                    <Form>
                        <CardBody>
                            {JSON.stringify(values)}
                            <hr />
                            <FormGroup tag="fieldset">
                                <Label>Course</Label>
                                {courses.map((course, courseIndex) => {
                                    return <FormGroup check key={courseIndex}>
                                        <Label check>
                                            <input
                                                type="radio"
                                                name="course"
                                                value={course.id}
                                                checked={values.course === course.id}
                                                onChange={() => {
                                                    setFieldValue('course', course.id)
                                                    setFieldValue('subject', '')
                                                }}
                                            /> {course.name}
                                        </Label>
                                    </FormGroup>
                                })}
                                {errors.course}
                            </FormGroup>

                            <FormGroup>
                                <Label for="subject">Subject</Label>
                                <Field name="subject" id="subject" className="form-control" component="select">
                                    <option>---</option>
                                    {subjects.filter(s => s.course_id === values.course).map((subject, subjectIndex) => {
                                        return <option value={subject.id}>{subject.name}</option>
                                    })}
                                </Field>
                                <ErrorMessage className="text-danger" name="subject" component="div" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="start_date">Start Date</Label>
                                <Field name="start_date" timeFormat={false} component={FormikDatetime} />
                                <ErrorMessage className="text-danger" name="start_date" component="div" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="additional_notes">Additional Notes</Label>
                                <Field className="form-control" name="additional_notes" component="textarea" />
                                <ErrorMessage className="text-danger" name="additional_notes" component="div" />
                            </FormGroup>

                        </CardBody>
                        <CardFooter className="text-right">
                            <button className="btn btn-sm btn-info" type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Spinner size="sm" color="default" />}
                                &nbsp;Save
                            </button>
                        </CardFooter>

                    </Form>
                )}
            </Formik>


        </Card>
    )
}
