import Link from 'next/link';
import { makeStyles, createStyles, Typography, Theme, Paper, ListItem, List, Grid, Button } from '@material-ui/core';
import { useState } from 'react';
import { gql } from '@apollo/client';

import ToolDialog from '../components/dialog/ToolDialog';
import Image from '../components/Image';
import { useToolsQuery } from '../gen/graphql-types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            background: theme.palette.gray.light,
            boxShadow: `0 0.125em 0.25em 0 ${theme.palette.shadow.main}, 0 0.1875em 0.625em 0 ${theme.palette.shadow.main}`,
            padding: '2em',
        },
        root: {
            padding: '2em',
        },
        linkButton: {
            marginLeft: '1em',
        },
    })
);

export const QUERY_TOOLS = gql`
    query Tools {
        tools(orderBy: { name: asc }) {
            id
            name
            description
            link
            image
        }
    }
`;

export default function Home() {
    const [dialogOpen, setDialogOpen] = useState(false);
    // CSR(Client-side rendering) example
    const { data } = useToolsQuery();
    const classes = useStyles();

    return (
        <Grid container spacing={4} direction="column" className={classes.root}>
            <Grid item>
                <Typography variant="h4" component="h1" gutterBottom>
                    Next.js example
                </Typography>
            </Grid>
            <Grid item container spacing={4} direction="column" xs={12} alignItems="center">
                <Grid container item alignContent="center" justify="center">
                    <Typography variant="h5">Tools</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.linkButton}
                        onClick={() => setDialogOpen(true)}
                    >
                        Create
                    </Button>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <List aria-label="Project Tool List">
                            {data?.tools.map(({ id, name, image }) => (
                                <ListItem key={id}>
                                    <Grid container alignItems="center" justify="space-between">
                                        {/* NextJS Image optimization example. Props are src(any file under the public dir), width, and height */}
                                        {image && <Image image={image} name={name} />}
                                        <Typography variant="body1">{name}</Typography>
                                        <Link href="/tool/[id]" as={`/tool/${id}`}>
                                            <Button variant="contained" color="primary" className={classes.linkButton}>
                                                Learn more
                                            </Button>
                                        </Link>
                                    </Grid>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
            <ToolDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
        </Grid>
    );
}
