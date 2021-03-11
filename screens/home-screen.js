import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, Image } from 'react-native';

import BookCount from "../components/book-count";
import CustomActionButton from "../components/custom-action-button";
import { Ionicons } from "@expo/vector-icons";

import colors from '../assets/colors';
import * as firebase from "firebase";
import { snapshotToArray } from "../helpers/firebase-helpers";
import ListItem from "../components/list-item";
import * as Animatable from 'react-native-animatable';
import ListEmptyComponent from "../components/list-empty-component";

import { connect } from "react-redux";

class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      currentUser: {},
      totalCount: 0,
      readingCount: 0,
      readCount: 0,
      isAddNewBookVisible: false,
      textInputData: '',
      books: [],
      booksReading: [],
      booksRead: [],
    }
    console.log('constructor');
    this.textInputRef = null;
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const currentUserData = await firebase.database().ref('users').child(user.uid).once('value');

    const books = await firebase.database().ref('books').child(user.uid).once('value');

    const booksArray = snapshotToArray(books);

    this.setState({
      currentUser: currentUserData.val(),

    });

    this.props.loadBooks(booksArray.reverse());
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.readCount < this.state.readCount) {
      console.log('fetch data')
    }
    console.log('update')
  }

  componentWillUnmount() {
    console.log('unmount')
  }

  showAddNewBook = () => {
    this.setState({ isAddNewBookVisible: true })
  }

  hideAddNewBook = () => {
    this.setState({ isAddNewBookVisible: false })
  }

  addBook = async (book) => {
    this.setState({ textInputData: '' });
    this.textInputRef.setNativeProps({ text: '' });
    try {
      const snapshot = await firebase.database().ref('books')
        .child(this.state.currentUser.uid).orderByChild('name').equalTo(book).once('value');
      if (snapshot.exists()) {
        alert('Unable to add as book already exists.');
      } else {
        const key = await firebase.database().ref('books')
          .child(this.state.currentUser.uid).push().key;

        const response = await firebase.database().ref('books')
          .child(this.state.currentUser.uid).child(key).set({ name: book, read: false });

        this.props.addBook({ name: book, read: false, key: key });

      }

    } catch (error) {
      console.log(error);
    }
  };

  markAsRead = async (selectedBook, index) => {
    try {
      await firebase.database().ref('books').child(this.state.currentUser.uid).child(selectedBook.key).update({ read: true });
      let books = this.state.books.map(book => {
        if (book.name == selectedBook) {
          return { ...book, read: true };
        }
        return book;
      });
      let booksReading = this.state.booksReading.filter(book => book.name !== selectedBook.name)

      this.setState(prevState => ({
        books: books,
        booksReading: booksReading,
        booksRead: [...prevState.booksRead, { name: selectedBook.name, read: true }],
        // readingCount: prevState.readingCount - 1,
        // readCount: prevState.readCount + 1
      }));

      this.props.markBookAsRead(selectedBook);

    } catch (error) {
      console.log(error)
    }
  };

  renderItem = (item, index) => (
    <ListItem item={item}>
      { item.read ?
        (
          <Ionicons name='ios-checkmark' color={colors.logoColor} size={30} />
        )
        : (
          <CustomActionButton style={styles.markasReadButton} onPress={() => this.markAsRead(item, index)}>
            <Text style={styles.markAsReadButtonText}>Mark as Read</Text>
          </CustomActionButton>
        )}
    </ListItem>

    // <View style={styles.listItemContainer}>
    //   <View style={styles.imageContainer}>
    //     <Image source={require('../assets/icon.png')} style={styles.image} />
    //   </View>
    //   <View style={styles.listItemTitleContainer}>
    //     <Text style={styles.listItemTitle}>{item.name}</Text>
    //   </View>

    // </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />

        <View style={styles.container}>
          <View style={styles.textInputContainer}>
            <TextInput
              onChangeText={(text) => this.setState({ textInputData: text })}
              style={styles.textInput}
              placeholder='Enter Book Name'
              placeholderTextColor={colors.txtPlaceholder}
              ref={component => { this.textInputRef = component }}
            />
          </View>
          {/* {this.state.isAddNewBookVisible && (
            <View style={styles.textInputContainer}>
              <TextInput onChangeText={(text) => this.setState({ textInputData: text })} style={styles.textInput} placeholder='Enter Book Name' placeholderTextColor='grey' />

              <CustomActionButton style={styles.checkmarkButton} onPress={() => this.addBook(this.state.textInputData)}>
                <Ionicons name="ios-checkmark" color="white" size={40} />
              </CustomActionButton>

              <CustomActionButton onPress={this.hideAddNewBook}>
                <Ionicons name="ios-close" color="white" size={40} />
              </CustomActionButton>
            </View>
          )} */}

          <FlatList
            data={this.props.books.books}
            renderItem={({ item }, index) => this.renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <ListEmptyComponent text="Not Reading Any Books" />
            }
          />

          <Animatable.View animation={this.state.textInputData.length > 0 ? 'slideInRight' : 'slideOutRight'}>
            <CustomActionButton position="right" style={styles.addNewBookButton} onPress={() => this.addBook(this.state.textInputData)}>
              <Text style={styles.addNewBookButtonText}>+</Text>
            </CustomActionButton>
          </Animatable.View>
        </View>

        {/* <View style={styles.footer}>
          <BookCount title='Total Books' count={this.state.books.length} />
          <BookCount title='Reading' count={this.state.booksReading.length} />
          <BookCount title='Read' count={this.state.booksRead.length} />
        </View> */}
        <SafeAreaView />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadBooks: books =>
      dispatch({ type: 'LOAD_BOOKS_FROM_SERVER', payload: books }),
    addBook: book => dispatch({ type: 'ADD_BOOK', payload: book }),
    markBookAsRead: book => dispatch({ type: 'MARK_BOOK_AS_READ', payload: book })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain
  },
  header: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontSize: 24
  },
  textInputContainer: {
    height: 50,
    flexDirection: 'row',
    margin: 5,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingLeft: 5,
    borderColor: colors.listItemBG,
    borderBottomWidth: 5,
    fontSize: 22,
    fontWeight: '200',
    color: 'white'
  },
  checkmarkButton: {
    backgroundColor: colors.bgSuccess
  },
  listItemContainer: {
    height: 100,
    flexDirection: 'row',
    backgroundColor: colors.listItemBG,
    alignItems: 'center',
    marginVertical: 5
  },
  imageContainer: {
    height: 70,
    width: 70,
    marginLeft: 10
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    borderRadius: 35
  },
  listItemTitle: {
    fontWeight: '100',
    fontSize: 22,
    color: 'white'
  },
  listItemTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5
  },
  listEmptyComponent: {
    marginTop: 50,
    alignItems: 'center'
  },
  listEmptyComponentText: {
    fontWeight: 'bold'
  },
  markasReadButton: {
    width: 100,
    backgroundColor: colors.bgSuccess
  },
  markAsReadButtonText: {
    fontWeight: 'bold',
    color: 'white'
  },
  addNewBookButton: {
    backgroundColor: colors.bgPrimary,
    borderRadius: 25
  },
  addNewBookButtonText: {
    color: 'white',
    fontSize: 30
  },
  footer: {
    height: 70,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderColor,
    flexDirection: 'row'
  }
});