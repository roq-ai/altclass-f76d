import { Box, Center, Flex, Link, List, ListItem, Spinner, Stack, Text } from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import { Error } from 'components/error';
import { FormListItem } from 'components/form-list-item';
import { FormWrapper } from 'components/form-wrapper';
import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import { routes } from 'routes';
import useSWR from 'swr';
import { compose } from 'lib/compose';
import {
  AccessOperationEnum,
  AccessServiceEnum,
  requireNextAuth,
  useAuthorizationApi,
  withAuthorization,
} from '@roq/nextjs';
import { UserPageTable } from 'components/user-page-table';

import { getStudentById } from 'apiSdk/students';
import { StudentInterface } from 'interfaces/student';

function StudentViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<StudentInterface>(
    () => (id ? `/students/${id}` : null),
    () =>
      getStudentById(id, {
        relations: ['parent', 'tutor'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Students',
              link: '/students',
            },
            {
              label: 'Student Details',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            <FormWrapper wrapperProps={{ border: 'none', gap: 3, p: 0 }}>
              <Text
                sx={{
                  fontSize: '1.875rem',
                  fontWeight: 700,
                  color: 'base.content',
                }}
              >
                Student Details
              </Text>
              <List
                w="100%"
                css={{
                  '> li:not(:last-child)': {
                    borderBottom: '1px solid var(--chakra-colors-base-300)',
                  },
                }}
              >
                <FormListItem
                  label="Created At"
                  text={format(parseISO(data?.created_at as unknown as string), 'dd-MM-yyyy')}
                />

                <FormListItem
                  label="Updated At"
                  text={format(parseISO(data?.updated_at as unknown as string), 'dd-MM-yyyy')}
                />

                {hasAccess('parent', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                  <FormListItem
                    label="Parent"
                    text={
                      <Link as={NextLink} href={`/parents/view/${data?.parent?.id}`}>
                        {data?.parent?.profile_info}
                      </Link>
                    }
                  />
                )}
                {hasAccess('tutor', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                  <FormListItem
                    label="Tutor"
                    text={
                      <Link as={NextLink} href={`/tutors/view/${data?.tutor?.id}`}>
                        {data?.tutor?.profile_info}
                      </Link>
                    }
                  />
                )}
              </List>
            </FormWrapper>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'student',
    operation: AccessOperationEnum.READ,
  }),
)(StudentViewPage);
